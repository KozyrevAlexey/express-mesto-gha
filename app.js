const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env

const app = express();

app.use(express.json());

/**временное решение авторизации */

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')



const users =[];
let id = 0;

app.get('/users', (reg, res) => {
  console.log("Запрос на /users");

  res.status(200).send(users);
});

app.post('/users', (reg, res) => {
  id += 1;
  const newUser = {
    id,
    ...reg.body,
  };

  users.push(newUser);

  res.status(201).send(newUser);
});

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}` )
});