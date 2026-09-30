const mongoose=require('mongoose');
const validator=require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please tell me your name!']
    },
    photo:{
        String,
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please provide your email'],
        validator:[validator.isEmail,'Please valid email']
    },
    password:{
        type:String,
         required:[true,'Please provide a password'],
        minlength:8,
        select:false
    }
});
const User=mongoose.model('User',userSchema);
module.exports =User;