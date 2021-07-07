//import dependencies
const { Schema, model } = require('mongoose');

//Data
const PizzaSchema = new Schema({
    //Name of the pizza
    pizzaName: {
        type: String
    },
    //Name of User
    createdBy: {
        type: String
    },
    //timestamp of when the pizza was created
    createdAt: {
        type: Date,
        default: Date.now
    },
    //Pizza size
    size: {
        type: String,
        default: 'Large'
    },
    //Pizza Toppings will use Array Datatype
    toppings: [],

    //association to the Comments model
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
            // the ref property tells the Pizza model which document to search to find the right comments
        }
    ]
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;