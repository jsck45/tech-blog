const router = require('express').Router();
const { withAuth } = require('../../middleware/authMiddleware');
const { Post } = require('../../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title', 'content', 'userId'],
    });
    const mappedPosts = posts.map((post) => post.get({ plain: true }));
    res.json(mappedPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'userId'],
    });
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      const mappedPost = post.get({ plain: true });
      res.json(mappedPost);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve post' });
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user.id; // Modify this line based on your authentication setup
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
});

// Update a post
router.put('/:id', withAuth, async (req, res) => {
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
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
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
});

module.exports = router;
