const router = require('express').Router();

//Implement Controller Methods
//Destructure the method names out of the imported object and use those names directly
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// Set up GET all and POST at /api/pizzas
// /api/pizzas
// ============================================
router
// /api/pizzas/
.route('/')
//provide the name of the controller method as the callback
    .get(getAllPizza)
    .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
// ============================================
router
// /api/pizzas/:id
.route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);

module.exports = router;