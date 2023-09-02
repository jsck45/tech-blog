const router = require('express').Router();
const withAuth = require('../../middleware/withAuth'); 
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} = require('../../controllers/UserController');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', withAuth, getUserById);

module.exports = router;