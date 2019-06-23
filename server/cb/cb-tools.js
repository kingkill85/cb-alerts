"use strict";

const puppeteer = require('puppeteer');
const events = require('events');

const emitter = new events.EventEmitter();

class TipListener {
  constructor(modelName) {
    this.emitter = new events.EventEmitter();

    function delay(time) {
      return new Promise(function(resolve) { 
          setTimeout(resolve, time)
      });
    }

    var that = this;
    (async () => {
      try {
        that.browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const [page] = await that.browser.pages();
  
        async function tipParser(addedText) {
          if (/(.*?) tipped \d+ token/g.test(addedText) &&
            addedText.indexOf(':') == -1) {
  
            var tipStrArr = addedText.split(' ');
            that.emitter.emit('tip',{ model: modelName, tipper: tipStrArr[0], tokens: tipStrArr[2] });
          }
        }
  
        page.exposeFunction('tipParser', tipParser);
        await page.goto('https://chaturbate.eu/' + modelName + '/');
        await page.waitForSelector('.chat-list');
        await delay(2000);
        await page.evaluate(() => {
          const observerTarget = document.querySelector('div.chat-list');
          const mutationObserver = new MutationObserver((mutationsList) => {
  
            for (const mutation of mutationsList) {
              tipParser(mutation.addedNodes[0].innerText);
            }
          });
          mutationObserver.observe(
            observerTarget,
            { childList: true },
          );
        });
      } catch (e) {
        console.log(e);
      }
    })();  
  }

  stop() {
    if(this.browser) {
      this.browser.close();
    }
  }

  on(event, listener){
    return this.emitter.on(event, listener);
  }
}



module.exports = {
  TipListener: TipListener
};