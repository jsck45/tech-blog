const router = require('express').Router();
const { withAuth } = require('../../middleware/authMiddleware');
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

// Get a comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.json(comment);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve comment' });
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedComment[0] === 0) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.status(200).json({ message: 'Comment updated successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!deletedComment) {
      res.status(404).json({ error: 'Comment not found' });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
