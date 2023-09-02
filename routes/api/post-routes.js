const router = require('express').Router();
const withAuth = require('../../middleware/withAuth');
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
} = require('../../controllers/PostController');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', withAuth, createPost);
router.put('/:id', withAuth, updatePost);
router.delete('/:id', withAuth, deletePost);

module.exports = router;