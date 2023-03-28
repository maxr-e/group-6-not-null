const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// Home route
router.get('/', withAuth, async (req, res) => {
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
//posting create a post to homepage
// router.get('/', async (req, res) => {
//   try {
//     console.log("Should be getting home route")
//     // Get all projects and JOIN with user data
//     const postData = await Post.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['username'],
//         },
//       ],
//     });
//     console.log("just got my postData")
//     console.log(postData)
//     // Serialize data so the template can read it
//     const posts = postData.map((post) => post.get({ plain: true }));
//     console.log("__+_+_+__+_+_+__+_++__++_______________________________")
//     console.log(posts)
//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       ...posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//posting create a post to homepage
router.get('/post/:id', async (req, res) => {
  try {
    console.log("+++++++++++++++++++++")

    console.log("Should be viewing my project view")
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    console.log(postData)
    console.log("+++++++++++++++++++++")
    const post = postData.get({ plain: true });
    console.log(post)
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
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

router.get('/post', withAuth, async (req, res) => {
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
    res.render('post', { user, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});


// Get single post
// router.get('/post/:id', async (req, res) => {
//   try {
//     const postIDdata = await Post.findByPk(req.params.id, {

//       include: [
//         {
//           model: User,
//           attributes: {
//             exclude: ['password'],
//           },
//           include: [Post]
//         },
//         {
//           model: Comment,
//           include: [User]
//         }
//       ]
//     });
//     const post = postIDdata.get({ plain: true });
//     res.render('single-post', { post, logged_in: req.session.logged_in });
//     console.log(post);
//     // console.log(post[0].Comments[0]);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
