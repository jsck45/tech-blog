const express = require('express');
const apiRouter = express.Router();
const htmlRoutes = require('./html-routes');

// Import the individual API route files
const commentRoutes = require('./api/comment-routes');
const userRoutes = require('./api/user-routes');
const postRoutes = require('./api/post-routes');

// Use the routes from the individual files
apiRouter.use('/comments', commentRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/posts', postRoutes);
apiRouter.use('/', htmlRoutes);

module.exports = apiRouter;
