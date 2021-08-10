const router = require('express').Router();

const userRoutes = require('./user-routes');
const parseRoutes = require('./parse-routes');
const collectionRoutes = require('./collection-routes');
const matchRoutes = require('./match-routes');

router.use('/user', userRoutes);
router.use('/parse', parseRoutes);
router.use('/collection', collectionRoutes);
router.use('/match', matchRoutes);

module.exports = router;