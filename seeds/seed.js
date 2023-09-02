const seedPost = require('./post-seeds');
const seedUser = require('./user-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/config');

const seedAll = async () => {
  await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
    console.log('\n----- USERS SEEDED -----\n');

  await seedPost();
    console.log('\n----- POSTS SEEDED -----\n');

  await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedAll();