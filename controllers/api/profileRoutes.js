const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.delete('/:id', withAuth, async (req, res) => {
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