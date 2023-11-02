const mongoose = require('mongoose');

const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        // _id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     default: new mongoose.Types.ObjectId(),
        // },
        username: {
            type: String,
            maxLength: 255,
            required: true,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('User', UserSchema);