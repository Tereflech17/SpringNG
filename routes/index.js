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
        profileUpdate,
        getForgotPw,
        putForgotPw,
        getReset,
        putReset } = require('../controllers/index');
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

/* GET /forgot */
router.get('/forgot-password', getForgotPw);

/* PUT /forgot */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));

/* GET /reset/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset/:token */
router.put('/reset/:token', asyncErrorHandler(putReset));

module.exports = router;
