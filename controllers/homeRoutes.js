const router = require('express').Router();


// direct user to login page on root and on /login routes
router.get('/', async (req, res) => {
  res.render('login');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

// direct user to dashboard on /dashboard route
router.get('/dashboard', async (req, res) => {
  res.render('dashboard');
});

// direct user to home on /home route
router.get('/home', async (req, res) => {
  res.render('home');
});



module.exports = router;