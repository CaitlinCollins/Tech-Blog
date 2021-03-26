const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// User hasMany Post 
User.hasMany(Post, {
    foreignKey: 'user_id',
});

// Comment belongsTo User
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// User hasMany Comment 
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

// Comment belongsTo Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// Post hasMany Comment 
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});





module.exports = { 
    User,
    Post,
    Comment
};