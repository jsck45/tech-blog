const { Post, Comment, User } = require('../models'); 

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: ['id', 'title', 'content', 'userId'],
      });

      const posts = postData.map((project) => project.get({ plain: true }));

      res.render('homepage', { posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        attributes: ['id', 'title', 'content', 'userId'],
      });
      if (!post) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.json(post);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve post' });
    }
  },

  createPost: async (req, res) => {
    try {
      const userId = req.session.user.id; 
      const newPostData = {
        ...req.body,
        userId, 
      };
  
      const newPost = await Post.create(newPostData);
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create post' });
    }
  },
  

  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedPost[0] === 0) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(200).json({ message: 'Post updated successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update post' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: { id: req.params.id },
      });
      if (!deletedPost) {
        res.status(404).json({ error: 'Post not found' });
      } else {
        res.status(204).end();
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  },

  getProfile: async (req, res) => {
    const isAuthenticated = req.session.logged_in;

    if (isAuthenticated) {
      try {
        const userId = req.session.user.id;

        const postsData = await Post.findAll({
          where: { userId },
          attributes: ['id', 'title', 'content', 'userId'],
          order: [['createdAt', 'DESC']],
        });

        const posts = postsData.map((post) => post.get({ plain: true }));

        if (posts.length > 0) {
          const authenticatedUser = req.session.user;
          res.render('profile', { user: authenticatedUser, posts });
        } else {
          res.status(404).send('No posts found for this user.');
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.redirect('/login');
    }
  },

  renderPostPage: async (req, res) => {
    try {
      const postId = req.params.id; // Assuming you're passing the post ID as a route parameter

      // Find the post by its ID
      const post = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: ['username'], // You can specify the user attributes you need
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Find the comments associated with the post, including user data
      const commentsData = await Comment.findAll({
        where: { postId }, // Filter by post ID
        include: [
          {
            model: User,
            attributes: ['username'], // You can specify the user attributes you need
          },
        ],
      });

      // Map the post and comments data to plain JavaScript objects
      const postData = post.get({ plain: true });
      const comments = commentsData.map((comment) => {
        const commentData = comment.get({ plain: true });
        return {
          ...commentData,
          author: comment.User.username, // Add the author field
        };
      });

      // Render the post.handlebars template with the post and comments
      res.render('post', { post: postData, comments });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve post and comments' });
    }
  },
};