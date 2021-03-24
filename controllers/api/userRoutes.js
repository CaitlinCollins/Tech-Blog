const router = require('express').Router();
const { User } = require('../../models');


// Takes sign up information and posts it to the User table in the database.
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create( 
            {
                user_name: req.body.user_name,
                password: req.body.password,
            });
           
                req.session.save(() => {
                req.session.user_name = userData.user_name;
                req.session.user_id = userData.id;
                req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Takes the login information and checks it against the stored users in the database.
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { user_name: req.body.user_name }});

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
            req.session.user_name = userData.user_name;
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Ends the session
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;