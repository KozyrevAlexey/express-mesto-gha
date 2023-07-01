const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { ERROR_NOT_FOUND } = require('./errors/errors');
const cookieParser = require('cookie-parser');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());
app.use(cookieParser());


mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(router);
app.use(errorsHandler);


app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`)
});