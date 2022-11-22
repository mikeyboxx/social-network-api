const connection = require('../config/connection');
const {User} = require('../models');
const getRandomName = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log(`Connected to mongodb://${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));

  await User.deleteMany({});

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

  for (let i =0; i < response.length; i++){
    const friendsArr = [];
    for (let j = i; j < response.length; j++){
      friendsArr.push(response[j]._id);
    }
    await User.findByIdAndUpdate(response[i]._id, { friends: friendsArr });
  }


  process.exit(0);
});
