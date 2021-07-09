//import dependencies
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


//Data
const PizzaSchema = new Schema({
    //Name of the pizza
    pizzaName: {
        type: String,
        required: [true, 'You need to provide a pizza name!']
        trim: true
    },
    //Name of User
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    //timestamp of when the pizza was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    //Pizza size
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    },
    //Pizza Toppings will use Array Datatype
    toppings: [],

    //association to the Comments model
    comments: [
        {
            //Tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model.
            type: Schema.Types.ObjectId,
            ref: 'Comment'
            // the ref property tells the Pizza model which document to search to find the right comments
        }
    ]
},
    {
        // use toJSON to tell schema to use Virtuals
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
    }
);

// Virtual Property
// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);


// export the Pizza model
module.exports = Pizza;