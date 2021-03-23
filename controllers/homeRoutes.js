const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const withAuth = require('../utils/auth');

// Prevents access to the home page if not logged in.
// router.get(['/', '/home'], withAuth, async (req, res) => {
//   try {
//   res.render('home', {
//     loggedIn: req.session.loggedIn,
//   });
//   }
//   catch (err) {
//     res.status(500).json(err);
//   }
// });

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

// Gets all posts
router.get(['/', '/home'], withAuth, async (req, res) => {
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
    if (!postData) {
      res.status(404).json({ message: "No posts found." });
      return;
    }
    res.status(200).json(posts);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Gets the post by id.
router.get('/home/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{model: User}],
    });

    const post = postData.get({ plain: true });
  

    if (!postData) {
      res.status(404).json({ message: "This post cannot be found!" });
      return;
    }
    res.status(200).json(post);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Updates the post by id.
router.put('/home/:id', async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (!postData) {
      res.status(404).json({message: "No update found."});
      return;
    }

      res.status(200).json(postData);
    }
    catch (err) {
      res.status(400).json(err);
   }
});

// Delete post by id.
router.delete('/home/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found.' });
      return;
    }

      res.status(200).json(postData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;