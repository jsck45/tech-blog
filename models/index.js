const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'Cascade',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'Cascade',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = { User, Post, Comment };
