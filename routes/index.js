const express = require('express'),
      router = express.Router();
const { landingPage, getLogin } = require('../controllers/index');


// root route - landing page
router.get('/', landingPage);

router.get('/login', getLogin);

router.get('/welcome', (req, res) => {
    res.send("you are loggedIn , welcome back!")
})

module.exports = router;
