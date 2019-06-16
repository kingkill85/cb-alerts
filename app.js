const express = require('express');
const ws = require('ws');
const puppeteer = require('puppeteer');
var path = require('path');

const port = process.env.PORT || 8080
const app = express();
const server = app.listen(port, () => console.log(`Listening on ${ port }`));
const connectionMap = new Map()

app.use((req, res) => res.sendFile(path.join(__dirname, '/index.html'))) ;

const wss = new ws.Server({ server })

wss.on('connection', function (ws) {
  var modelname = ws.protocol;
  listenTips(modelname, ws);
  ws.on('close' ,() => {
    for (const [key, value] of connectionMap.entries()) {
      if(key == ws) {
        value.close();
        
        connectionMap.delete(ws);
        break;
      }
    };
  });
});


function listenTips(modelName, ws) {
  (async () => {
    try {
      var browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });
      connectionMap.set(ws, browser);
      const [page] = await browser.pages();

      async function mutationListener(addedText) {
        if (/(.*?) tipped \d+ token/g.test(addedText) &&
          addedText.indexOf(':') == -1) {

          var tipStrArr = addedText.split(' ');

          if(tipStrArr && tipStrArr.length > 0){
            var logstring = `[${modelName}] ${tipStrArr[0]}: ${tipStrArr[2]}`;
            console.log(logstring);
            ws.send(logstring)
          }
        }
      }

      page.exposeFunction('mutationListener', mutationListener);
      await page.goto('https://chaturbate.eu/' + modelName + '/');
      await page.waitForSelector('.chat-list');
      await delay(2000);
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
      if(browser && browser.isConnected()){
        ws.send(`Model ${modelName} not online. Try later again.`)
      }
      console.log(e);
    }
  })();
}

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}