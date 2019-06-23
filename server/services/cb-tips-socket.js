const socket = require('socket.io');
const cbTools = require('../cb/cb-tools');

module.exports = (server) =>{
  const io = socket(server, { path: '/socket.io/cb-tips'});

  io.on('connection', client => {
    let listener = null;
    
    client.on('model', (model) => {
      
      if(listener){
        listener.stop();
      }

      listener = new cbTools.TipListener(model);
      listener.on('tip', (tip) => {
        console.log(`${tip.tokens} tipped from ${tip.tipper} for ${tip.model}!`);
        client.emit('tip', tip);
      });

    });
    
    
    client.on('disconnect', () => { 
      if(listener){
        listener.stop();
      }
    });

  });

  
  

};