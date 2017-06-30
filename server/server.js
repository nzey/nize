const express = require('express');
const app = express();
const db = require('./models/index.js');

const port = process.env.PORT || 3000;

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

// seed db
require('./seeders/tasks.js')(db);

app.listen(port, () => {
  console.log('app listening on', port);
});
