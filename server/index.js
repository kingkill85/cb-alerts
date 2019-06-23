const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = http.createServer(app)

app.use(bodyParser.json());
app.use(cors());

require('./services/cb-tips-socket')(server);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const port = 5000; 
server.listen(port, () => console.log(`Server is running on port ${port}`));