const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Comment Reply Schema
// ==================================================
const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    //add toJSON to add getters
    {
        toJSON: {
            getters: true
        }
    }
);


// Comment Schema
// ==================================================
const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String
        },
        commentBody: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        // use ReplySchema to validate data for a reply
        replies: [ReplySchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Virtual Property
// ====================================================
// get total count of comments and replies on retrieval
CommentSchema.virtual('replyCount').get(function () {
    return this.replies.length;
});

// create the Comment model using the CommentSchema
const Comment = model('Comment', CommentSchema);

// export the Comment model
module.exports = Comment;