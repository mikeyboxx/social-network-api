const connection = require('../config/connection');
const {User} = require('../models');
const getRandomName = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const name = getRandomName().toLowerCase();
    users.push({
      username: name + Math.floor(Math.random() * 100).toString().padStart(3, 0),  //generate random number and pad with zeroes
      email: name + '@' + getRandomName().toLowerCase() + '.com'
    })
  }

  await User.collection.insertMany(users);

  console.log(users);
  process.exit(0);
});
