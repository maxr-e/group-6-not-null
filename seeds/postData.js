const { Post } = require('../models');
const postData = require('./postData.json');


const seedposts = () => Post.bulkCreate(postData);

module.exports = seedposts;