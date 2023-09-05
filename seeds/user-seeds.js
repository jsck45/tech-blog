const { User } = require('../models');
const bcrypt = require('bcrypt');

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

const seedUsers = async () => {
  const hashedUserData = userData.map(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return {
      username: user.username,
      password: hashedPassword,
    };
  });

  const users = await Promise.all(hashedUserData);

  await User.bulkCreate(users);
};

module.exports = seedUsers;
