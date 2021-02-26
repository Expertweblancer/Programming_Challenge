const express = require('express');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.use('/', indexRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Backend running at port', port);
})

module.exports = app;
