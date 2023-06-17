const router = require('express').Router();

const { getCards, createCard, deliteCardById, putLikeCard, deliteLikeCard, } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deliteCardById);
router.delete('/:cardId/likes', deliteLikeCard);
router.put('/:cardId/likes', putLikeCard);

module.exports = router;