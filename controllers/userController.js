const User =require('../models/user');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchasync');

exports.createUser =catchAsync(async(req,res,next)=>{
    const us= await User.create(req.body);
    res.status(201).json({
        status:'success',
    data:{
        data:us,
    }
});
});

exports.getUser = catchAsync(async(req,res,next)=>{
    const detail = await User.findById(req.params.id);
    res.status(201).json({
        status:'success',
        data:{
            data:detail,
        }
    }) 
});

exports.deleteUser=catchAsync(async(req,res,next)=>{
   const del= await User.findByIdAndDelete(req.params.id);

   if(!del){
       return next(new AppError('No document is present',404));
   }
    res.status(204).json({
        status:'success',
        data:null,
    });
})

exports.updateOne=catchAsync(async(req,res,next)=>{
    const upd=await User.findByIdAndUpdate(req.params.id,req.body,{
        returnDocument: 'after',
        runValidators:true
    });
    if(!upd){
        return next(new AppError('document not available',404));
    }
    res.status(204).json({
        status:'success',
        updated:upd,
    });
});

