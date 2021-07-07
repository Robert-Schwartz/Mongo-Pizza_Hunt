const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// USE Routes
// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/comments', commentRoutes);
router.use('/pizzas', pizzaRoutes);

module.exports = router;