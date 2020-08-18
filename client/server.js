const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/entryRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })

}

app.use(favicon(__dirname + '/build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});