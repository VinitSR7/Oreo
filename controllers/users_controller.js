const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){ 
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: "Profile",
            profile_user: user 
        });
    });
}

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     res.status(401).send('Unautherized');
    // }

    if(req.user.id == req.params.id){
        // console.log(__dirname);
        try{
            let user = await User.findById(req.params.id);
            // console.log("###");
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('**** Multer Error: ', err);
                }
                //console.log(file);
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    // this is saving the path of the uploaded file into the avatar field in the user
                    // console.log(user.avatar);
                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back'); 
            });
        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error', err);
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
        return res.redirect('/');
        // User.findOne({email: req.body.email}, function(err, user){
        //     return res.redirect('/users/profile/'+user.id);
        // });
    
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
        req.flash('success', 'Logged in Successfully!');
        return res.redirect('/');
        // return res.redirect('/users/profile/'+user.id);
    });
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/users/sign-in')
}