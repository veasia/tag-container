// Load required packages
var path = require("path");
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var connectEnsureLogin = require('connect-ensure-login');
var expressSession = require('express-session');

var config = require("./config").authentication;
var Users = require('./models/users')(config.users)



function isAuthenticated () {
    console.log('is authenticated function called')
    return passport.authenticate('local', { failureRedirect: '/login' })
}
module.exports = {
    init: function (app) {
                // Configure the local strategy for use by Passport.
        //
        // The local strategy require a `verify` function which receives the credentials
        // (`username` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport.use(new Strategy(
            function (username, password, cb) {
                if (config.disable == 'true') {
                    console.log('Any user and password works')
                    return cb(null, {id:1}); // Any user and password works
                }

                Users.findByUsername(username, function (err, user) {
                    if (err) { return cb(err); }
                    if (!user) { return cb(null, false); }
                    if (user.password != password) { return cb(null, false); }
                    return cb(null, user);
                });
            }));


        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser(function (user, cb) {
            cb(null, user.id);
        });
        passport.deserializeUser(function (id, cb) {
            Users.findById(id, function (err, user) {
                if (err) { return cb(err); }
                cb(null, user);
            });
        });

        app.use(expressSession({ secret: config.secret, resave: false, saveUninitialized: false }));
        app.use(passport.initialize());
        app.use(passport.session());

        app.get('/login', function(req, res){
            res.sendFile(path.join(__dirname, 'login.html'));
        });
        app.post('/login',  isAuthenticated(), function(req, res) {
            res.redirect('/');
        });
        app.get('/logout',function(req, res){
            req.logout();
            res.redirect('/login');
        });
    },

    requireAuthentication: function (req, res, next)  {
        return connectEnsureLogin.ensureLoggedIn();
    }
};
