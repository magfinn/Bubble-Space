const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

//do I need to make friends route? - users/friends
// or a reactions route? - thoughts/reaction

module.exports = router;