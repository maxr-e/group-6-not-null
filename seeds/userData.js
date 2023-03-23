const { User } = require('../models');
const userData = require('./userData.json');


const seedusers = () => User.bulkCreate(userData);

module.exports = { seedusers, userData };