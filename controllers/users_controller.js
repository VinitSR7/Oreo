const User = require('../models/user');
module.exports.profile = function(req, res){ 
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user 
        });
    });
}

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        res.status(401).send('Unautherized');
    }
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile'); 
    }
    return res.render('user_sign_up', {
        title: " Oreo | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        User.findOne({email: req.body.email}, function(err, user){
            return res.redirect('/users/profile/'+user.id);
        });
    
    }
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
                User.findOne({email: req.body.email}, function(err, user){
                    return res.redirect('/users/sign-in');
                });
            })
        }else{
            return res.redirect('back');
        }

    })

}

// Sign In, create the session for the user
module.exports.createSession = function(req, res){
    // TODO 
    User.findOne({email: req.body.email}, function(err, user){
        return res.redirect('/users/profile/'+user.id);
    });
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/users/sign-in')
}