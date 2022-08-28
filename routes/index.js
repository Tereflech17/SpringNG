const express = require('express'),
      router = express.Router({mergeParams: true});
const { landingPage, 
        getRegister, 
        postRegister, 
        getLogin,
        postLogin, 
        getLogout,
        getWelcomeProfileForm,
        postProfileInfoSetup,
        getProfileTest, 
        getProfile,
        profileEdit,
        profileUpdate } = require('../controllers/index');
const { asyncErrorHandler, isLoggedIn } = require('../middleware/index');


// root route - landing page
router.get('/', landingPage);

/* GET /signup */
router.get('/signup', getRegister);

/* POST /signup */
router.post('/signup', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout)


/* GET /welcome profile steup */ 
router.get('/welcome', getWelcomeProfileForm);

/* POST /welcome */
router.post('/welcome', asyncErrorHandler(postProfileInfoSetup));

router.get("/myprofile", asyncErrorHandler(getProfileTest));

/* GET /profile */
router.get('/author/myprofile', isLoggedIn, asyncErrorHandler(getProfile))

router.get('/author/myprofile/:id/edit', isLoggedIn, asyncErrorHandler(profileEdit));

router.put('/author/myprofile/:id', isLoggedIn, asyncErrorHandler(profileUpdate))



module.exports = router;
