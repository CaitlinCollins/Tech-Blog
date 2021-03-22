const router = require('express').Router();
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



module.exports = router;