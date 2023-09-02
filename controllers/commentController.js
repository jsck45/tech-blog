const { Comment } = require('../models');

module.exports = {
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve comments' });
    }
  },

  getCommentById: async (req, res) => {
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
  },

  createComment: async (req, res) => {
    try {
      const newComment = await Comment.create(req.body);
      res.status(201).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create comment' });
    }
  },

  updateComment: async (req, res) => {
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
  },

  deleteComment: async (req, res) => {
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
  },
};
