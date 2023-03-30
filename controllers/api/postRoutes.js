const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a comment
router.post('/:id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      description: req.body.description,
      user_id: req.body.post_id,
      post_id: req.body.route_id
    });
    console.log(req.body.post_id);
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    console.log(req.body.post_id);
    res.status(500).json(err);
  }
});

// update post likes
router.put('/:id', async (req, res) => {
  const int = parseInt(req.body.tally);
  console.log(req.body);
  try {
    const updatePD = await Post.update(
      {
        tally: int + 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    res.status(200).json(updatePD);
    console.log(updatePD);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;