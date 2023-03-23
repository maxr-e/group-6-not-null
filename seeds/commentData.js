const { Comment } = require('../models');
const commentData = require('./commentData.json');



const seedcomments = () => Comment.bulkCreate(commentData);

module.exports = seedcomments;