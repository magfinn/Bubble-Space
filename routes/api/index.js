const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404 Error Page not Found!</h1>');
});

module.exports = router;