const express = require('express');
const apiRouter = express.Router();
const htmlRouter = express.Router(); 

// Import the individual API route files
const commentRoutes = require('./api/comment-routes');
const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');

// Import the HTML routes
const htmlRoutes = require('./html-routes');

// Use the routes from the individual API files
apiRouter.use('/comments', commentRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/posts', postRoutes);

// Use the HTML routes
htmlRouter.use('/', htmlRoutes);

module.exports = {
  apiRouter,
  htmlRouter,
};
