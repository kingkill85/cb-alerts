const express = require('express');
const ws = require('ws');
const puppeteer = require('puppeteer');
var path = require('path');

const port = 8080;
const app = express();
const server = app.listen(port, () => console.log(`Listening on ${ port }`));

app.use((req, res) => res.sendFile(path.join(__dirname, '/index.html'))) ;

const wss = new ws.Server({ server })

wss.on('connection', function (ws) {
  
});

listenTips('my_mongolian_slut');
listenTips('keokistar');
listenTips('magical_ramona');

function listenTips(modelName) {
  (async () => {
    var browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const [page] = await browser.pages();

      async function mutationListener(addedText) {
        if (/(.*?) tipped \d+ token/g.test(addedText) &&
          addedText.indexOf(':') == -1) {

          var tipStrArr = addedText.split(' ');

          if(tipStrArr && tipStrArr.length > 0){
            var logstring = `[${modelName}] ${tipStrArr[0]}: ${tipStrArr[2]}`;
            console.log(logstring);
            if (wss) {
              wss.clients.forEach((client) => {
                client.send(logstring);
              });
            }
          }
        }
      }

      page.exposeFunction('mutationListener', mutationListener);
      await page.goto('https://chaturbate.eu/' + modelName + '/');
      await page.waitForSelector('.chat-box');
      await page.evaluate(() => {
        const observerTarget = document.querySelector('div.chat-list');
        const mutationObserver = new MutationObserver((mutationsList) => {

          for (const mutation of mutationsList) {
            const { removedNodes, addedNodes } = mutation;
            mutationListener(addedNodes[0].innerText);
          }
        });
        mutationObserver.observe(
          observerTarget,
          { childList: true },
        );
      });
    } catch (e) {
      if(browser){
        browser.close()
      }
      listenTips(modelName);
      console.log(e);
    }
  })();
}