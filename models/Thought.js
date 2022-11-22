const { Schema, model } = require('mongoose');
const moment = require('moment');
const { ObjectId } = require('bson');

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

    reactions: [
      new Schema({
        reactionId: {
          type: ObjectId,   
          default: new ObjectId
        },
        reactionBody: {
          type: String,   
          required: true,
          trim: true,
          validate: [
            function(text){ return (text.length >= 1 && text.length <=280 ) },
            'Text must be between 1 and 280 characters!',
          ] 
        },
        username: {
          type: String,   
          required: true,
        },
        createdAt: {
          type: Date,   
          required: true,
          default: Date.now,
          get: function (date) {
            return moment(this.createdAt).format('LLLL');
          }, 
        },
    },{_id: false})]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);


// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;