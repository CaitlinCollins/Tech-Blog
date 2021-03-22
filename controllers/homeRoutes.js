const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevents access to the home page if not logged in.
router.get('/', withAuth, async (req, res) => {
  try {
  res.render('home', {
    logged_in: req.session.logged_in,
  });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Prevents access to the home page if not logged in.
router.get('/home', withAuth, async (req, res) => {
  try {
  res.render('home', {
    logged_in: req.session.logged_in,
  });
  }
  catch (err){
    res.status(500).json(err);
  }
});

// Prevents access to the dashboard page if not logged in.
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Redirects to root if user is already logged in.
router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;