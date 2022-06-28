const User = require('../models/user/user');
const Author = require("../models/user/author");
const Book = require("../models/book");
const Article = require("../models/article");
const passport = require('passport');


module.exports = {
    
    //GET / - home page 
    landingPage(req, res, next) {
        res.render('index', {title: "SprinNG - Home"});
    }, 

    //GET /register
    getRegister(req, res, next) {
        res.render('signup', {title: 'Signup', firstname: '', lastname: ''});
    },

    //POST /register
    async postRegister(req, res, next) {
        try {

            let newUser = new User({
                firstName: req.body.firstname, 
                lastName:  req.body.lastname, 
                username: req.body.username
            });
            await User.register(new User(newUser), req.body.password);
            req.login(newUser, function(err){
                if (err) return next(err);
                req.session.success = `Welcome to SpringNG Writer's Database!`;
                console.log("the reqeust object =======> ", req.user);
                console.log("the reqeust object userID =======> ", req.user._id);

                res.redirect('/welcome'); //TODO: 
            });
        }catch(err){
            const { firstname, lastname, email } = req.body;
            let error = err.message;
            if(error.includes('duplicate') && error.includes('index: email_1 dup key')){
                error = 'A user with the given email is already registered';
            }
            res.render('signup', {title: 'Signup', firstname, lastname, email, error})
        }
    },

    //GET /login
    getLogin(req, res, next){
        res.render('login', {title: 'Login'});
    },

    // POST /Login
    async postLogin(req, res, next){
        const { username, password } = req.body;
        const {user, error } = await User.authenticate()(username, password);
        console.log("user------>", JSON.stringify(user, undefined, 2));
        if(!user && error) return next(error);
        req.login(user, function(err){
            if (err) return next(err);
            req.session.success = `Welcome back, ${user.firstName} ${user.lastName}!`;
            const redirectUrl = req.session.redirectTo || '/author/myprofile';
            delete req.session.redirectTo;
            res.redirect(redirectUrl);
        })
    },

    // GET /logout 
    getLogout(req, res, next){
        req.logout();
        req.session.success = 'Logged out successfully!'
        res.redirect('/');
    },

    // GET /profile-setup
    getWelcomeProfileForm(req, res, next){
        res.render('welcome');
    },

    async postProfileInfoSetup(req, res, next){
        //create author profile
        console.log("in profile setup post logic ====> ", req.user);

        req.body.userInfo.userID = req.user;

         //assign authorID referenced in books and articles
        //  req.body.bookInfo.authorID = authorInfo._id;
        //  req.body.articleInfo.authorID = authorInfo._id;

        let authorInfo = new Author(req.body.userInfo);
        let bookInfo = new Book(req.body.bookInfo);
        let articleInfo = new Article(req.body.articleInfo);

        //assign book and article information to author model
        authorInfo.books.push(bookInfo);
        authorInfo.articles.push(articleInfo);

        //save author information
        await authorInfo.save();

        //assign authorID referenced in books and articles
        bookInfo.authorID = authorInfo._id;
        articleInfo.authorID = authorInfo._id;

        //save book and article information
        await bookInfo.save();
        await articleInfo.save();

        console.log("body parse ========>", req.body); // for debugging purposes
       
        req.session.success = 'Profile setup successfully completed!';
        res.redirect("/profile");
      
    },

    async getProfileTest(req, res, next){
        // const author = await Author.find().where('userID').equals(req.user);
        const author = await Author.find({}).populate({ 
            path: 'books', 
            populate:{
                path: 'books', 
                // model: 'Author'
            },
        }).populate({ 
            path: 'articles',
            populate:{
                path: 'articles', 
                // model: 'Author'
            } 
        }).populate({ 
            path: 'userID',
            model: 'User'
        })
        console.log("getting profile data testing ======> ", JSON.stringify(author, undefined, 2))
        res.json(author); 
    },

    // GET /profile
    async getProfile(req, res, next){
        const authorProfile = await Author.find().populate({
            path: 'books',
            populate: {
                path: 'authorID',
                model: 'Author'
            }
        }).populate({
            path: 'articles',
            populate:{
                path: 'authorID', 
                model: 'Author'
            } 
        }).where('userID').equals(req.user);
        console.log("authorProfile ======>>>>>> ", authorProfile);
        res.render('profile', { authorProfile });
    },

    async profileEdit(req, res, next){
        let authorProfile = await Author.findById(req.params.id);
        let userProfile = await User.findById(authorProfile.userID);
        console.log("userProfile ======>>>>>> ", userProfile);
        res.render('edit', { authorProfile, userProfile });
    },

    async profileUpdate(req, res, next){
        await Author.findByIdAndUpdate(req.params.id, req.body.authorProfile);
        await User.findByIdAndUpdate(req.user.id, req.body.user);
        req.session.success = 'Profile updated successfully';
        res.redirect('/author/myprofile');
    }
   
}