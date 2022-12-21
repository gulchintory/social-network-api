const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
  
    const username = getRandomName();
    const first = username.split(' ')[0];
    const last = username.split(' ')[1];
    const email = first + "." + last + "@gmail.com";

    users.push({
      username,
      email,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  const thoughts = [];
  // Loop 20 times -- add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    const thoughtText= i + ' Sample thought';
    const username= users[i].username;

    thoughts.push({
      thoughtText,
      username
    });
  }

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
