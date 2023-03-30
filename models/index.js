const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Likes = require('./Likes');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(Likes, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Likes.belongsTo(User, {
  foreignKey: 'user_id',
})

Likes.belongsTo(Post, {
  foreignKey: 'post_id',
})

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Post.hasMany(Likes, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Post, Comment, Likes };