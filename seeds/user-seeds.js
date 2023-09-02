const { User } = require('../models');

const userData = [
  {
    username: 'JohnDoe',
    password: 'password123', 
  },
  {
    username: 'JaneSmith',
    password: 'password456',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
