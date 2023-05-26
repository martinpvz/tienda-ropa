// 

// routes/user.js


const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  console.log('La ruta /user se está llamando correctamente');
  try {
    const userId = await User.createUser(req.cookies);
    res.cookie('userId', userId, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // Añade aquí la creación de la cookie
    res.json({ userId });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


module.exports = router;