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
}

// Sign In, create the session for the user
module.exports.createSession = function(req, res){
    // TODO 
}