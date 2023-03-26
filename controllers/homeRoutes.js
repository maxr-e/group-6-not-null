const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// Home route
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({

      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          }
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });
    console.log({ postData });
    const posts = postData.map((post) =>
      post.get({ plain: true })
    );
    console.log(posts);
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          include: [User],
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/post', async (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/post');
    return;
  }

  res.render('post');

})

// Get single post
router.get('/post/:id', async (req, res) => {
  try {
    const postIDdata = await Post.findByPk(req.params.id, {

      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
          include: [Post]
        },
        {
          model: Comment,
          include: [User]
        }
      ]
    });
    const post = postIDdata.get({ plain: true });
    res.render('single-post', { post, logged_in: req.session.logged_in });
    console.log(post);
    // console.log(post[0].Comments[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
