const express = require('express');
const router = express.Router();
const {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} = require('../../controllers/CommentController');
const withAuth = require('../../middleware/withAuth');

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', withAuth, createComment);
router.put('/:id', withAuth, updateComment);
router.delete('/:id', withAuth, deleteComment);

module.exports = router;