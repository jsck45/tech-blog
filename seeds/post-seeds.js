const { Post } = require('../models');

const postData = [
  {
    title: 'Why MVC is so important',
    content:
      'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    userId: 1,
  },
  // {
  //   title: 'Authentication vs. Authorization',
  //   content:
  //     'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
  //   userId: 2,
  // },
 
  ];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;