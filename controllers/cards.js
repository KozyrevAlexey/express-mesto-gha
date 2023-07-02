const Card = require('../models/card');

const ErrorValidation = require('../errors/errorValidation');
const ErrorNotFound = require('../errors/errorNotFound');
const ErrorForbidden = require('../errors/errorForbidden.js');

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
    .orFail(() => new ErrorNotFound(`Карточка для удаления не найдена`))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.deleteOne(card)
          .then((cards) => res.send(cards))
          .catch(next)
      } else {
        throw new ErrorForbidden('Чужую карточку удалить нельзя')
      }
    })
    .catch(next);
};

const putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound(`Карточка не найдена`)
      } else {
        next(res.send(card));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
      } else {
        next(err);
      }
    })
};

const deliteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new ErrorNotFound(`Карточка не найдена`)
      } else {
        next(res.send(card));
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new ErrorValidation(`Переданные данные некорректны`));
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