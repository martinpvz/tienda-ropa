// routes/user.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const userId = await User.createUser();
    res.json({ userId });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;