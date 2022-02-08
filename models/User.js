const { Schema, model, Types, SchemaTypes } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { isEmail } = require('validator');

const FriendSchema = new Schema(
  {
    friendId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    //validate email
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid email'],
    },
    //array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    //array of _id values referencing the User model (self-reference)
    friends: [FriendSchema],
  },
  {
    toJSON: {
      virtuals: true,
      gettings: true,
    },
    id: false,
  }
);

//retrieves the length of the user's friends array field on query
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;
