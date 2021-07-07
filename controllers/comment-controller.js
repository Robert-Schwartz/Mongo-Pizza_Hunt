// Import models
const { Comment, Pizza } = require('../models');

// Comment Controller Object
const commentController = {
    // ADD comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    // $push to add comment's _id to specific pizza
                    { $push: { comments: _id } },
                    { new: true }
                    //because we passed the option of `new: true`, we're receiving back the updated pizza (the pizza with the new comment included).
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    }

    // REMOVE comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if (!deletedComment) {
                    return res.status(404).json({ message: 'No comment with this ID' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } },
                    { new: true }
;                )
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No Pizza found with this ID' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    }
};

// export controller
module.export = commentController;

