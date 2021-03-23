const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// Prevents access to the home page if not logged in.
router.get('/', withAuth, async (req, res) => {
  try {
  res.render('login', {
    loggedIn: req.session.loggedIn,
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
    loggedIn: req.session.loggedIn,
  });
  }
  catch (err){
    res.status(500).json(err);
  }
});

// Redirects to root if user is already logged in.
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('login');
});

// Directs to signup page on click event.
router.get('/signup', async (req, res) => {
  res.render('signup');
})

// Prevents access to the dashboard page if not logged in.
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', {
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Create new post with user input.
router.post('/dashboard', async (req, res) => {
  try {
    const userData = await Post.create(
      {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
    res.status(200).json(userData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;