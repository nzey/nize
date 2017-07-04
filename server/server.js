const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const db = require('./models/index.js');
const handlers = require('./handlers.js');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.static('./'));
app.use(express.static('dist'));

const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/api/tasks', handlers.taskHandler);
app.post('/api/tasks', jsonParser, handlers.taskHandler);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// seed db
require('./seeders/tasks.js')(db);

app.listen(port, () => {
  console.log('app listening on', port);
});


// OLD VERSION
// app.get('*', (req, res) => {
//   res.sendFile(`${__dirname}/dist/index.html`);
// });