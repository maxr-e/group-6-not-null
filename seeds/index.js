const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const x = 0;

const seedAll = async () => {

  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {

    const posts = await Post.create({
      ...post,
    });
    console.log(posts);
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
