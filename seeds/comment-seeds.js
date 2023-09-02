const { Comment } = require('../models');

const commentData = [
  {
    userId: 1,
    postId: 1,
    comment: 'Super helpful!',
  },
  {
    userId: 2,
    postId: 1,
    comment: 'This is great!',
  },
  {
    userId: 3,
    postId: 2,
    comment: 'Amazing work!',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;