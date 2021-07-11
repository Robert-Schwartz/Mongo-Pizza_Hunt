const router = require('express').Router();
// import the methods from the comment-controller file.
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
.route('/:pizzaId')
    .post(addComment);

// /api/comments/<pizzaId>/<commentId>
router
    .route('/:pizzaId/:commentId')
    .put(addReply)
    .delete(removeComment)

// Delete reply
// /api/comments/<pizzaID>/<commentID>/<replyID>
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;