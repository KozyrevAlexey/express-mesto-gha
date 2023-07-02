const router = require('express').Router();
const { validateCreateCard, validateDeliteCardById, validateDeliteLikeCard, validatePutLikeCard } = require('../utils/regex');

const { getCards, createCard, deliteCardById, putLikeCard, deliteLikeCard, } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCard);

router.delete('/:cardId', validateDeliteCardById, deliteCardById);

router.delete('/:cardId/likes', validateDeliteLikeCard, deliteLikeCard);

router.put('/:cardId/likes', validatePutLikeCard, putLikeCard);

module.exports = router;