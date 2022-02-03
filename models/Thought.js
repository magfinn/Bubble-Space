const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
    },
    //created at
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    //the user that created this thought
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      gettings: true,
    },
    id: false,
  }
);

//retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

//create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
