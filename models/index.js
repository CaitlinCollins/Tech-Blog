const User = require('./User');
const Post = require('./Post')


// Post belongsTo User
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// User hasMany Post 
User.hasMany(Post, {
    foreignKey: 'user_id',
});


module.exports = { 
    User,
    Post
};