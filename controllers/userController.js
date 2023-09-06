const { User } = require('../models');
const bcrypt = require('bcrypt'); 

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username'],
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username'],
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'content', 'userId'],
          },
          {
            model: Comment, 
            attributes: ['id', 'comment', 'userId', 'postId'],
          },
        ],
      });
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  createUser: async (req, res) => {
    try { 
      const hashedPassword = await bcrypt.hash(req.body.password, 10); 
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword,
      });
  
      req.session.logged_in = true;
      req.session.user = { id: newUser.id, username: newUser.username };

      res.redirect('/profile');
    } catch (err) {
      console.error('Error during user creation:', err); 
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
  

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.update(req.body, {
        where: { id: req.params.id },
      });
      if (updatedUser[0] === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json({ message: 'User updated successfully' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.destroy({
        where: { id: req.params.id },
      });
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(204).end();
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  loginUser: async (req, res) => { 
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (passwordMatch) {
        req.session.logged_in = true;
        req.session.user = { id: user.id, username: user.username };        
        return res.redirect('/profile');
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  },
  

  logoutUser: (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logout successful' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Logout failed' });
    }
  },
};