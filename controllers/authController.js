const User= require('../models/user');
const CatchAsync=require('../utils/catchasync');
const AppError=require('../utils/AppError');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const { promisify } = require('util');
// const Email = require('../utils/email');



const signToken = id =>jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });


const createSendToken=(user,statusCode,req,res)=>{
    const token=signToken(user._id);
    // res.cookie(name, value, options);
    res.cookie('jwt',token,{
        expires:new Date(
            Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
            httpOnly:true,
            secure:req.secure || req.headers['x-forwarded-proto']==='https'   
});
user.password=undefined;
res.status(statusCode).json({
    status:'success', 
    token,
    data:{
        user
    }
})
}

exports.signup=CatchAsync(async(req,res,next)=>{
   const newuser =await User.create({
    name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
   });
//    const url=`${req.protocol}://${req.get('host')}/me`;
//    await new Email(newuser,url).sendWelcome();
   createSendToken(newuser,201,req,res);
})

exports.login=CatchAsync(async(req,res,next)=>{
     const {email,password}=req.body;
     if(!email || !password){
        return next(new AppError('Please provide email and password',400));
     }
     const user=await User.findOne({email}).select('+password');
     if(!user || !(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password',401));
     }
     createSendToken(user,200,req,res);
})

exports.logout=(req,res)=>{
    res.cookie('jwt','loggedout',{
        expires:new Date(Date.now()+10*1000),   
    });
    res.status(200).json({status:'success'});
}

exports.protect=CatchAsync(async(req,res,next)=>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1];
}else if(req.cookies && req.cookies.jwt){
    token=req.cookies.jwt;
}
  if(!token){
            return next(new AppError('You are not logged in! Please log in to get access.',401));
          }

          const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
          const currentUser=await User.findById(decoded.id);
           if(!currentUser){
        return next(new AppError('The user belonging to this token does no longer exist.',401));
    }
     if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again.',401));
    }
       req.user = currentUser;
        res.locals.user = currentUser;

    next();
});


exports.restrictTo = (...roles)=> (req,res,next)=>{
        // roles ['admin','lead-guide']. role='user'
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this action',403));
        }
        next();
    };

exports.forgotPassword = CatchAsync(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError('There is no user with email address.',404));
    }

       const resetToken = user.createPasswordResetToken();
       await user.save({validateBeforeSave:false});
    
      const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
      res.status(200).json({
        status:'success',
        message:'Token sent to email!',
        resetURL
      });
});    


exports.resetPassword = CatchAsync(async(req,res,next)=>{
//1)Get user based on the token 
const hashedToken = crypto
.createHash('sha256')
.update(req.params.token)
.digest('hex');

// console.log('URL token:', req.params.token);
// console.log('Hashed token:', hashedToken);

const user = await User.findOne({
    passwordResetToken:hashedToken,
    passwordResetExpires:{$gt:Date.now()}});
    // console.log('USER:', user);



//2)if token has not expired, and there is user ,set the new password 
   if(!user){
    return next(new AppError('Token is invalid or has expired',400))
   }
   user.password = req.body.password;
   user.passwordConfirm=req.body.passwordConfirm;
   user.passwordResetToken=undefined;
   user.passwordResetExpires=undefined;
   await user.save();
 
//3)update changePasswordAt property for the user 

//4)log the user in,send JWT
createSendToken(user,200,req,res);

});


exports.updatePassword = CatchAsync (async(req,res,next)=>{
    // 1)Get user from collection
         const user =await User.findById(req.user.id).select('+password');

    //2)check if posted  current password is correct
         if(!( await user.correctPassword(req.body.passwordCurrent,user.password))){
            return next(new AppError('Your current password is wrong',400))
         }

    //3)if so, update password
    user.password = req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    await user.save();
    //User.findByIdAndUpdate will Not work as intended!

    //4)Log user_in,send JWT
    createSendToken(user,200,req,res);
});


 

 

