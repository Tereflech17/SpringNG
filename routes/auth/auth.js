const express = require('express');
const router = express.Router();
const passport= require('passport');
const { getGoogleLogin, postGoogleLogin } = require('../../controllers/auth')



router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/google'
}), (req, res) => {
    res.redirect("/welcome");
});

router.get('/auth/yahoo', passport.authenticate('yahoo', {}));

router.get('/auth/yahoo/callback', passport.authenticate('yahoo', {failureRedirect: '/auth/yahoo'})),
(req, res) => {
    res.redirect("/welcome");
}

module.exports = router;