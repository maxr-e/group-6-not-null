const sequelize = require('../config/connection');
const { User, Post, Comment, Likes } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const likesData = require('./likesData.json');

const seedAll = async () => {

  await sequelize.sync({ force: true });


  const user = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log(user);

  for (const post of postData) {
    
    const posts = await Post.create({
      ...post,
    });
    console.log(posts);
  }
  
  for(const like of likesData) {
    const likes = await Likes.create({
      ...like
    })
    console.log(likes);
  }

  for (const comment of commentData) {
    
    const comments = await Comment.create({
      ...comment,
    });
    console.log(comments);
  }

  process.exit(0);
};

seedAll();
