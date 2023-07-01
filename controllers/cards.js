const Card = require('../models/card');



const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name = "ValidationError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    });
}

const deliteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else if (err.name = "Not Found") {
        next(new ErrorNotFound(`Пользователь не найден`));
      } else {
        next(err);
      }
    })
};

const putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else if (err.name = "Not Found") {
        next(new ErrorNotFound(`Пользователь не найден`));
      } else {
        next(err);
      }
    })
};

const deliteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => new Error("Not Found"))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else if (err.name = "Not Found") {
        next(new ErrorNotFound(`Пользователь не найден`));
      } else {
        next(err);
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