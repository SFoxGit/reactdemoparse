const router = require('express').Router();

const userRoutes = require('./user-routes');
const parseRoutes = require('./parse-routes');
const collectionRoutes = require('./collection-routes');

router.use('/user', userRoutes);
router.use('/parse', parseRoutes);
router.use('/collection', collectionRoutes);

module.exports = router;