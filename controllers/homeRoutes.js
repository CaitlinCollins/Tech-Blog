const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const withAuth = require('../utils/auth');


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
  if (req.session.loggedIn) {
    res.redirect('/home');
    return;
  }
  res.render('signup');
})

// Gets all posts
router.get(['/','/home'], async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const posts = postData.map((post) =>
    post.get({ plain: true })
    );
    res.render('home', { 
      posts,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Gets the post by id.
router.get('/home/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });
    const post = postData.get({ plain: true });
    res.render('viewPost', {
      post,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;