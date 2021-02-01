const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async  function(req, res){
	
    try{
        let user = await User.findOne({email:req.bdoy.email});

        if(!user || user.password != req.body){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in Successful, here is your token, please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'oreo', {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log("****", err);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
}
