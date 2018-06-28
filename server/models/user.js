const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = require('mongodb').ObjectID;

mongoose.connect('mongodb://satyamsndrm:Satyam007@ds255970.mlab.com:55970/mongo007' , (err , db)=>{
    if(err){
        console.log('databse connection failed');
    }else{
        console.log('database connecred')
    }


});

UserSchema= new Schema({
    email:String,
    picture:String,
    name:String,
    posts:[{
        text:String,
        date:{type:String , default:Date.now}
    }]
});

var User = mongoose.model('User' , UserSchema);

module.exports = User;