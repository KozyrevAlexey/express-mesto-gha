const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/regex')

const { getCards, createCard, deliteCardById, putLikeCard, deliteLikeCard, } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(regex).required(),
  })
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  })
}), deliteCardById);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  })
}), deliteLikeCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  })
}), putLikeCard);

module.exports = router;