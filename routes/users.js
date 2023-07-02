const router = require('express').Router();
const { validateUserId, validateProfilUpdate, validateAvatarUpdate } = require('../utils/regex');

const { getUsers, getUserInfo, getUserBuId, updateProfileUser, updateAvatarUser } = require("../controllers/users");

router.get('/', getUsers);
router.get('/me', getUserInfo);

router.get('/:userId', validateUserId, getUserBuId);
router.patch('/me', validateProfilUpdate, updateProfileUser);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatarUser);

module.exports = router;