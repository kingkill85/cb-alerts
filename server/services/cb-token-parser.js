module.exports = (server) =>{
  const io = require('socket.io')(server);
  const puppeteer = require('puppeteer');

  io.on('connection', client => {
    console.log('a user connected');
    
    client.on('disconnect', () => { 
      console.log('user disconnected');
    });

  });

};