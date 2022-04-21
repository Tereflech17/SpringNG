require("dotenv").config(); 

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const YahooStrategy = require("passport-yahoo-oauth").Strategy;
const authConfig = require("./authconfig");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const User = require("./models/user/user");

// require routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth/auth");

const app = express();

//connect to the database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bpxhw.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('connection successfull!!!!!');
});


// app.engine("ejs", engine);
app.set("view engine", "ejs");
// app.set('views',(__dirname + '/views'));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'Gandalf!',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: authConfig.googleAuth.clientID,
    clientSecret: authConfig.googleAuth.clientSecret,
    callbackURL: authConfig.googleAuth.callbackURL
},
function(accessToken, refreshToken, profile, done){
    console.log(profile);
   
    process.nextTick(function(){
        User.findOne({'googleUser.id': profile.id}, function(err, user){
            if(err){
                console.log(`googleAuth ${err}`);
                return done(err)
            }
            if(user){
                return done(null, user);
            }else {
                const newUser = new User();
                newUser.googleUser.id = profile.id;
                newUser.googleUser.token = accessToken;
                newUser.googleUser.email = profile.emails[0].value;
                newUser.googleUser.fullName = profile.displayName;
                newUser.googleUser.firstName = profile.name.givenName;
                newUser.googleUser.lastName = profile.name.familyName;

                newUser.save(function(err) {
                    if(err) throw err;
                    return done(null, newUser);
                });
                console.log(profile);
            }
        })
    })
    // return done(null, profile);
}));

// passport.use(new YahooStrategy({
//     consumerKey: authConfig.yahooAuth.consumerKey,
//     consumerSecret: authConfig.yahooAuth.consumerSecret,
//     callbackURL: authConfig.yahooAuth.callbackURL
// },
// function(token, tokenSecret, profile, done) {
//     return done(null, profile);
// }));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    //set success flash message 
    res.locals.success = req.session.success || '';
    delete req.session.success;
    //set error flash message 
    res.locals.error = req.session.error || '';
    delete req.session.error;
    next();
});


//error Handling
app.use((err, req, res, next) => {
    console.log(err); // print err message;
    
    //set locals only providing error in development 
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err: {};

    //render error page
    res.status(err.status || 500);
    res.status(err.status).send(err.message);
    res.send(err);
});


app.use(indexRoutes);
app.use(authRoutes);


module.exports = app;