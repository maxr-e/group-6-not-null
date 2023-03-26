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
      console.log({postData});
      const posts = formData.map((post) =>
        post.get({ plain: true })
      );
      console.log(posts);
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// Get single post
  router.get('/post/:id', async (req, res) => {
    try {
      const postIDdata = await Post.findByPk(req.params.id, {
  
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
      const post = postIDdata.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn });
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
