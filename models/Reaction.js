const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const moment = require('moment');

// Schema to create Reaction model
const reactionSchema = new Schema(
  {
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
        return moment(moment(moment.parseZone(date).local())).format('llll');
      }, 
    },
  },
  {
    toJSON: {
      getters: true
    },
    _id: false
  }
);

module.exports = reactionSchema;