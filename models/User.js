const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'You need to provide a username!',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'You need to provide an email!',
            unique: true,
            match: [/.+\@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
     // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create user model using the userSchema
const User = model('User', UserSchema);

//export user model
module.exports = User;