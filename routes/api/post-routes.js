const router = require('express').Router();
const { withAuth } = require('../../middleware/authMiddleware');
const postController = require('../../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', withAuth, postController.createPost);
router.put('/:id', withAuth, postController.updatePost);
router.delete('/:id', withAuth, postController.deletePost);
router.get('/posts/:id', postController.renderPostPage);

module.exports = router;
