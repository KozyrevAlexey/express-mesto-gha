const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const errorsHandler = require('./middlewares/errorsHandler');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`)
});