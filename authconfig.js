module.exports = {
    'googleAuth':  {
        'clientID': process.env.GOOGLE_CLIENT_ID,
        'clientSecret': process.env.GOOGLE_CLIENT_SECRET,
        'callbackURL': 'http://localhost:8080/auth/google/callback'
    },

    'yahooAuth': { 
        'consumerKey': process.env.YAHOO_CONSUMER_KEY,
        'consumerSecret': process.env.YAHOO_CONSUMER_SECRET,
        'callbackURL': 'http://localhost:8080/auth/yahoo/callback'
    }
}