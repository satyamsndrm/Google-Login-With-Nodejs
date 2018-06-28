const express = require('express')
const router = express.Router()
const User = require('../models/user');
const passport = require('passport')
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('710620814605-7e870nojth2j7n7l907hnoohbq2fcl2h.apps.googleusercontent.com');

require('../config/passportconfig.js');

router.get('/posts' , passport.authenticate('jwt' , {session:false}) , (req , res)=>{
    User.find({"posts.text":{$exists:true}}).exec((err , data)=>{
        if(err){
            res.json({status:false , msg:'Failed'});
        }
        res.json({status:true , data:data});
    })
})

router.post('/post',passport.authenticate('jwt' , {session:false}) , (req , res)=>{
    userId=req.user._id;
    User.findById(userId, (err, user) => {
        if(err){ 
            res.json({status:false , err});
        }
        user.posts.push({text:req.body.text});
        user.save((err, data) => {
            if(err){
                res.json({status:false , err});
            }else{
                res.json({status:true});
            }
        });
      });
  })


router.post('/google' , (req , res)=>{
    client.verifyIdToken({
        idToken: req.body.token
    }).then((response)=>{
        var userDetails = response.getPayload();
        var email = userDetails.email;
        var name = userDetails.name;
        var picture = userDetails.picture;
        User.findOne({ 'email': email }, (err, user) => {
            if (err) {
              res.json({status:false , err:err});
            }
            if(user){
                var toSign = {id:user._id , email:user.email}
                var jwtToken = jwt.sign(toSign, 'your_jwt_secret');
                res.json({status:true ,jwtToken, userId:user._id})
            }else{
                const newUser = new User({
                    'email': email,
                    'name': name,
                    'picture': picture,
                    'posts':[]
                })
                newUser.save((err, savedUser) => {
                    if (err) {
                        res.json({status:false , err});
                    }
                    var toSign = {id:savedUser._id , email:savedUser.email}
                    var jwtToken = jwt.sign(toSign, 'your_jwt_secret');
                    res.json({status:true ,jwtToken, userId:savedUser._id})
                })
            }
          })        
    }).catch((err)=>{
        res.json({status:false , err});
    });
})

module.exports = router;
