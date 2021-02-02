const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use anew stratgy for google logIn
passport.use(new googleStrategy({
        clientID: "471255257016-t2hcj75m27698u1iqprgt8gd0l4fsbjn.apps.googleusercontent.com",
        clientSecret: "FyBmVSMyvqwfM5JUKDhmT1E-",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
        
        // scope: ['https://www.googleapis.com/auth/userinfo.profile','email', 'displayName']

    },

    function(accessToekn, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            
            // console.log(accessToken, refreshToken);
            // console.log(profile);
            if(user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
