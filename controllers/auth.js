const User = require('../models/user/user')
const passport = require('passport');


module.exports = {
    // GET - /auth/google
    getGoogleLogin(req, res, next) {
        passport.authenticate('google', {scope: ['profile', 'email']});
    },

    // POST - /auth/google/callback
    postGoogleLogin(req,  res, next){
        passport.authenticate('google', {
            successRedirect: '/welcome',
            failureRedirect: '/'

        }),(req, res) => {
            res.redirect("/welcome")
        }
    }

}