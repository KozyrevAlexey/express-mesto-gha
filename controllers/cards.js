const Card = require('../models/card');

const { ERROR_VALIDATION, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(err => {
      res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message });
    })
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name = "ValidationError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message });
      }
    });
}

const deliteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else if (err.name = "Not Found") {
        res.status(ERROR_NOT_FOUND).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).send({ message: `Произошла неизвестная ошибка`, err: err.message });
      }
    })
};

const putLikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else if (err.name = "Not Found") {
        res.status(ERROR_NOT_FOUND).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).sendsend({ message: `Произошла неизвестная ошибка`, err: err.message });
      }
    })
};

const deliteLikeCard = (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(ERROR_VALIDATION).send({ message: `Переданные данные некорректны` });
        return;
      } else if (err.name = "Not Found") {
        res.status(ERROR_NOT_FOUND).send({ message: `Переданные данные некорректны` });
        return;
      } else {
        res.status(ERROR_DEFAULT).sendsend({ message: `Произошла неизвестная ошибка`, err: err.message });
      }
    })
};

module.exports = {
  getCards,
  createCard,
  deliteCardById,
  putLikeCard,
  deliteLikeCard,
};