const User = require('../models/user');
module.exports.profile = function(req, res){ 
    return res.render('users', {
        title: "Profile"
    }); 
} 

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: " Oreo | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Oreo | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // TODO 
    
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    } 
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in siging up'); return;}
        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in finding user in siging up'); return;}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    })

}

// Sign In, create the session for the user
module.exports.createSession = function(req, res){
    // TODO 
}