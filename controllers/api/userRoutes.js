const router = require('express').Router();
const { Model } = require('sequelize/types');
const { User } = require('../../models');


// Takes sign up information and posts it to the User table in the database.
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Takes the login information and checks it against the stored users in the database.
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { userName: req.body.userName }});

        if (!userData) {
            res.status(400).json({ message: 'Login failed. Please try again.'});
            return;
        }

        // Checks that the password is a match using the User Model.
        const validPass = await userData.checkPassword(req.body.password);

        if (!validPass) {
            res.status(400).json({ message: 'Login failed. Please try again.'});
            return;
        }

        // Saves a session to logged_in.
        req.session.save(() => {
            req.session.user_name = userData.userName;
            req.session.leggin_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Ends the session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;