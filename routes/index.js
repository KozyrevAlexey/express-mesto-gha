const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { createUser } = require('../controllers/users')

// router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new Error('Нет такого маршрута'))
});

module.exports = router;