const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: {
      type: String,   
      required: true,
      unique: true,
      trim: true 
    },
    
    email: {
      type: String,   
      required: true,
      unique: true,
      trim: true, 
      match: [/^.+@(?:[\w-]+\.)+\w+$/, 'Email is invalid!'],
    },

    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    }],

    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

// Create a virtual property `thoughtCount` that retrieves the length of the user's thoughts array field on query.
userSchema.virtual('thoughtCount')
  .get(function () {
    return this.thoughts.length;
  });

const User = model('user', userSchema);

module.exports = User;