const express = require('express');
const router = express.Router();
const Users = require('../models/user');

//ADD NEW USERS
router.post('/', async (req, res) => {
    try {
      const { username, password, first_name, last_name } = req.body;
  
      // Validate required fields
      if (!username || !password || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Create a new user
      const user = new Users({ username, password, first_name, last_name });
  
      // Save the user to the database
      const savedUser = await user.save();
  
      res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;