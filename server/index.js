const app = require('express')();
const server = require('http').createServer(app);

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

require('./services/cb-token-parser')(server);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

const port = 5000; 
server.listen(port, () => console.log(`Server is running on port ${port}`));