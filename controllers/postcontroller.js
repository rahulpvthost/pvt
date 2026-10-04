const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createpost = catchAsync(async (req, res, next) => {
  const doc = await Post.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

// exports.getpost = catchAsync(async (req, res, next) => {
//   const doc = await Post.findById(req.params.id).populate('author');
// });