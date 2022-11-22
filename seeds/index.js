const { toNamespacedPath } = require('path');
const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {getRandomName, names} = require('./data');
const { ObjectId } = require('bson');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log(`Connected to mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const name = getRandomName().toLowerCase();
    users.push({
      //generate random number and pad with zeroes
      username: '       ' + name + '' + Math.floor(Math.random() * 100).toString().padStart(3, 0),  
      email: '    ' + name + '@' + getRandomName().toLowerCase() + '.com'
    })
  }

  let response = await User.create(users);
  // const response = await User.insertMany(users);
  // const response = await User.collection.insertMany(users);
  
  // console.log(response);
  // console.log(users);

  //for every user, update friends array 
  for (let i =0; i < response.length; i++){
    const friendsArr = [];
    for (let j = i + 1; j < response.length; j++){
      friendsArr.push(response[j]._id);
    }
    await User.findByIdAndUpdate(response[i]._id, { friends: friendsArr });
  }

  // for every user, generate 5 thoughts. Each thoughtText is made up of 20 random names concatenated together.
  for (let i =0; i < response.length; i++){
    const thoughtsArr = [];
    for (let j = 0; j < 5; j++){
    
      // generate a string of 20 random names concatenated
      let str = '';
      for (let k = 0; k < 20; k++ ){
        str += names[Math.floor(Math.random() * names.length)];
      }
      
      // create thought
      let thought = await Thought.create({
        thoughtText: str,
        username: response[i].username,
      });

      // push on thoughts array
      thoughtsArr.push(thought._id);
      
      // for each thought, generate a reaction from every user except the creator of the thought
      const reactionsArr = [];
      for (let k = i; k < response.length; k++ ){
        // push on reactions array
        reactionsArr.push(
          {
            reactionId: new ObjectId, 
            reactionBody: str,
            username: response[k].username
          }
        )
      }
      
      // update thought with an array of reactions
      await Thought.findByIdAndUpdate(thought._id, { reactions: reactionsArr });


    }
    // update user with array of thoughts
    await User.findByIdAndUpdate(response[i]._id, { thoughts: thoughtsArr });
  }

  // output all users
  const thoughts = await Thought.find({});
  for (let item of thoughts){
    console.log({id: item._id, reactions: item.reactions})
  }


  process.exit(0);
});
