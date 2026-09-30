const User =require('../models/user');
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

