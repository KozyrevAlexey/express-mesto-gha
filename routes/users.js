const router = require('express').Router();

const { getUsers, createUser, getUserBuId, updateProfileUser, updateAvatarUser } = require("../controllers/users");

router.get('/', getUsers);
router.get('/:userId', getUserBuId);
router.post('/', createUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;