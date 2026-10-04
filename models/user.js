const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs');


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
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        select:false,
        validate:{
            validator:function(el){
                return el=== this.password;
            },
            message: 'Passwords are not same'
        }
    },
     passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active:{
        type: Boolean,
        default:true,
        select:false
    },
    role:{
        type:String,
        enum:['user','admin','guide','lead-guide'],
        default:'user'
    }
});

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return ;
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
});
userSchema.pre('save',function(){
    if(!this.isModified('password') || this.isNew) return;
    this.passwordChangedAt=Date.now()-1000;
});
userSchema.pre(/^find/,function(){
       this.find({active:{$ne: false }});
       
});
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword)
    {
    return  await bcrypt.compare(candidatePassword,userPassword);
}
userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return JWTTimestamp<changedTimestamp;
    }

    return false;
}


userSchema.methods.createPasswordResetToken= function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};





const User=mongoose.model('User',userSchema);
module.exports =User;