const express = require('express');
const router = express.Router();
const withAuth = require('../../middleware/withAuth');
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require('../../controllers/CommentController');

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', withAuth, createComment);
router.put('/:id', withAuth, updateComment);
router.delete('/:id', withAuth, deleteComment);

module.exports = router;