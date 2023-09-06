const router = require('express').Router();
const { withAuth } = require('../../middleware/authMiddleware');
const userController = require('../../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/signup', userController.createUser);
router.put('/:id', withAuth, userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);

module.exports = router;
