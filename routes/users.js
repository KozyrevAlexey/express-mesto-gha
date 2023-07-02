const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../utils/regex');
const cookieParser = require('cookie-parser');

const { getUsers, getUserInfo, getUserBuId, updateProfileUser, updateAvatarUser } = require("../controllers/users");


router.use(cookieParser());

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  })
}), getUserBuId);

router.patch('/me', celebrate({
  params: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  })
}), updateProfileUser);

router.patch('/me/avatar', celebrate({
  params: Joi.object().keys({
    avatar: Joi.string().pattern(regex).required(),
  })
}), updateAvatarUser);

module.exports = router;