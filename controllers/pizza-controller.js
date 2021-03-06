//require Pizza.js from models
const { Pizza } = require('../models');

const pizzaController = {
    // Get all pizzas
    // ================================================
getAllPizza(req, res) {
        Pizza.find({})
            //populate comments
            .populate({
                path: 'comments',
                select: '-__v'
                // The minus sign - in front of the field `__v` indicates that we don't want it to be returned.
            })
            .select('-__v')
            .sort({ _id: -1 })
            // sort in DESC order by the _id value
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one pizza by id
    // ================================================
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .populate({
                path: 'comments',
                select: '-__v'
            })
            .select('-__v')
            .then(dbPizzaData => {
                // if no Pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // CreatePizza
    /* With this .createPizza() method, we destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides.*/
    // ================================================
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // Update pizza by id
    /* With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document.*/
    // ================================================
    updatePizza({ params, body }, res) {
        //include runValidators: true to it will validate any new information
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete pizza
    // ================================================
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
}

//export module
module.exports = pizzaController;