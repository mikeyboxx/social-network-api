const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
      type: String,   
      required: true,
      trim: true,
      validate: [
        function(text){ return (text.length >= 1 && text.length <=280 ) },
        'Text must be between 1 and 280 characters!',
      ] 
    },
    createdAt: {
      type: Date,   
      required: true,
      default: Date.now,
      get: function (date) {
        return moment(this.createdAt).format('LLLL');
      }, 
    },
    username: {
      type: String,   
      required: true,
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Create a virtual property `reactionCount` that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;