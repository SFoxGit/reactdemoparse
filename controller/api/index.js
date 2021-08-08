const router = require('express').Router();

const userRoutes = require('./user-routes');
const parseRoutes = require('./parse-routes');

router.use('/user', userRoutes);
router.use('/parse', parseRoutes);

module.exports = router;