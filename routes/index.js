const express = require('express'),
      router = express.Router();
const { landingPage, getLogin, getRegister, getLogout, getProfile } = require('../controllers/index');
const { asyncErrorHanlder, isLoggedIn } = require('../middleware/index');


// root route - landing page
router.get('/', landingPage);

/* GET /signup */
router.get('/signup', getRegister);

/* POST /signup */

/* GET /login */
router.get('/login', getLogin);

/* POST /login */

/* GET /logout */
router.get('/logout', getLogout)

/* GET /profile */
router.get('/profile', getProfile)

router.get('/welcome', (req, res) => {
    res.send("you are loggedIn , welcome back!")
})

module.exports = router;
