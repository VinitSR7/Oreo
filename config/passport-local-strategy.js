const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user) {
            if(err){console.log('Erro in finding user ---> Passport'); return done(err);}
            if(!user || user.password != password){
                console.log("Invalid Username/Password!");
                return done(null, false);
            }
            return done(null, user);

        })
    }   

));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Erro in finding user ---> Passport'); 
            return done(err);
        }
        return done(null, user);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in 
    return res.redirect('/users/sign-in')
}
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are sending it to the locals for the views
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;