const router = require('express').Router();
const { withAuth } = require('../../middleware/authMiddleware');
const commentController = require('../../controllers/commentController');

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', withAuth, commentController.createComment);
router.put('/:id', withAuth, commentController.updateComment);
router.delete('/:id', withAuth, commentController.deleteComment);

module.exports = router;
