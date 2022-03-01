module.exports = {
    
    //GET / - home page 
    landingPage(req, res, next) {
        res.render('index', {title: "SprinNG - Home"});
    }, 

    //GET /login
    getLogin(req, res, next){
        res.render('login', {title: 'Login'});
    }

    //GET /register
   
}