const { Post } = require('../models'); 

module.exports = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  },

  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
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
      // Get the authenticated user's ID from the session or authentication middleware
      const userId = req.session.user.id; // Modify this line based on your authentication setup
  
      // Include the userId in the req.body before creating the post
      const newPostData = {
        ...req.body,
        userId, // Include the userId in the new post data
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
};
