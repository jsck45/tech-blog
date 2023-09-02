const { User } = require('../models');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
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
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
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
        req.session.user = user;
        return res.status(200).json({ message: 'Login successful', user });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  },

  logoutUser: (req, res) => {
    try {
      // Clear the user data from the session upon logout
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