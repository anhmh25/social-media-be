const mongoose = require('mongoose');

const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        // post_id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     default: new mongoose.Types.ObjectId,
        // },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        user_name: {
            type: String,
            ref: 'User',
        },
        content: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        comments: [
            {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                user_name: {
                    type: String,
                    ref: 'User',
                },
                contentCmt: String,
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        likes: [{
            user_id:  {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        }]
    },
    {
        timestamps: true,
    }
);

PostSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('Post', PostSchema);