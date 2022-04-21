module.exports = {
    
    //GET / - home page 
    landingPage(req, res, next) {
        res.render('index', {title: "SprinNG - Home"});
    }, 

    //GET /register
    getRegister(req, res, next) {
        res.render('signup', {title: 'Signup'});
    },

    //GET /login
    getLogin(req, res, next){
        res.render('login', {title: 'Login'});
    },

    // GET /logout 
    getLogout(req, res, next){
        req.logout();
        res.redirect('/');
    },

    // GET /profile
    getProfile(req, res, next){
        res.render('profile');
    }

  
   
}