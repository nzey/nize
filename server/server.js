require('dotenv').load();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const path = require('path');
const cors = require('cors');
const taskController = require('./controllers/taskController.js');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.static('./'));
app.use(express.static('dist'));

app.get('/api/tasks/', jsonParser, taskController);
app.post('/api/tasks', jsonParser, taskController);
app.put('/api/tasks', jsonParser, taskController);
app.patch('/api/tasks', jsonParser, taskController);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log('app listening on', port);
});
