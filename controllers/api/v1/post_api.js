const Post = require('../../../models/post');
const User = require('../../../models/user');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate:{
                path: 'user'
            }
        });
    
    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove(); 
            // remove comments
            await Comment.deleteMany({post: req.params.id}); 
            
            return res.json(200, {
                message: "Post and comments deleted!"
            });
        }else{
            return res.json(401, {
                message: "You cannot delete this POST!"
            });
        }
    }catch(err){ 
        // req.flash('error', 'You cannot delete this post!');
        return res.json(500, {
            message:"Interna Server Error"
        });   
    }
    
}
