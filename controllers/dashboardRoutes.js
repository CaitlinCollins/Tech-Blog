const router = require('express').Router();
const { Post } = require('../models');
const { User } = require('../models');
const withAuth = require('../utils/auth');


// Create post
router.get('/create', withAuth, async (req, res) => {
try {
    res.render('create', {
    loggedIn: req.session.loggedIn,
    });
}
catch (err) {
    res.status(500).json(err);
}
});

// Get all posts by user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.user_id,
      {
        include: [{model: User}],
      },
      {
        where: {
          user_id : req.session.user_id,
        }, 
    });
    const user_posts = postData.map((user_post) => 
    user_post.get( { plain: true })
    );
    res.render('dashboard', {
      user_posts,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// Create new post with user input.
router.post('/create', async (req, res) => {
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

// Updates the post by id.
router.put('/dashboard/:id', async (req, res) => {
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
  router.delete('/dashboard/:id', async (req, res) => {
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