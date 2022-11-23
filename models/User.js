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
      // validate: [
      //   function(email){ return /^.+@(?:[\w-]+\.)+\w+$/.test(email) },
      //   'Email is invalid!',
      // ]
      // validate: {
      //   validator: function(email){return /^.+@(?:[\w-]+\.)+\w+$/.test(email)},
      //   message: 'Email is invalid!',
      // }
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
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
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

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;