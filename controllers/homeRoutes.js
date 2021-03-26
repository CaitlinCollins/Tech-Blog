const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const { Comment } = require('../models');
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

// Create new comment with user input.
router.post('/home/:id', async (req, res) => {
  const user_id = req.session.user_id;
  try {
    const userData = await Comment.create(
      {
        user_comment: req.body.user_comment,
        user_id: user_id,
        post_id: req.body.post_id,
      });
      res.status(200).json(userData);
  } 
  catch (err) {
    res.status(400).json(err);
  }
});

// Gets the post by id.
// ///// Trouble with the comments part!
router.get('/home/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne(
      {
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: User,
          },
        ],
      });
    const post = postData.get({ plain: true });

    const commentData = await Comment.findAll(
      {
        where: {
          post_id: req.params.id,
        },
      }
    );

    const comments = commentData.map((comment) =>
    comment.get({ plain: true })
    );
    res.render('viewPost', {
      post,
      comments,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;