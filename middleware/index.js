const middleware = {
    asyncErrorHandler: (fn) => 
		(req, res, next) => {
			Promise.resolve(fn(req, res, next))
				.catch(next);
		}, 
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) return next();
        req.session.error = 'You need to be logged in!';
        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    },
    
}

module.exports = middleware;

