const sequelize = require('../config/connection');
const seedposts = require('./postData');
const { seedusers } = require('./userData');
const seedcomments = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedusers();

  await seedposts();

  await seedcomments();

  process.exit(0);
};

seedAll();