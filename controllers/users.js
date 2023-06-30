
const bcrypt = require('bcryptjs');
const User = require('../models/user')

const { ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserBuId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error("Not Found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } if (err.message === "Not Found") {
        res.status(ERROR_NOT_FOUND).send({ message: `Пользователь не найден` });
        return;
      }
      res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message });
      return;
    });
};

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, about, avatar, email, password: hashedPassword })
        .then((user) => res.send(user))
        .catch(next);
    })
.catch(next);
}






// {
//   const { name, about, avatar } = req.body;
//   User.create({ name, about, avatar })
//     .then((user) => res.send(user))
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
//         return;
//       } else {
//         res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message })
//       }
//     });
// };

const updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message })
      }
    })
};

const updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message })
      }
    })
}

module.exports = {
  createUser,
  getUserBuId,
  getUsers,
  updateProfileUser,
  updateAvatarUser,
};