const Post = require('../models/post');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createpost = catchAsync(async (req, res, next) => {
  const doc = await Post.create({
    
    title:req.body.title,
    content:req.body.content,   
    author:req.user.id});
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.getMyPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find({ author: req.user.id }).populate({
    path: 'author',
    select: 'name'
  });

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts }
  });
});
exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate({
    path: 'author',
    select: 'name'
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: post
    }
  });
});

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().populate({
    path: 'author',
    select: 'name'
  });
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: { posts }
  }); 
});

exports.deletePost = catchAsync(async (req, res, next) => {
  // admins can delete any post, normal users only their own
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.author = req.user.id;

  const post = await Post.findOneAndDelete(filter);

  if (!post) {
    return next(new AppError('No post found with that ID, or it is not yours', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id };
  if (req.user.role !== 'admin') filter.author = req.user.id;

  // only these fields can be edited
  const updates = {
    title: req.body.title,
    content: req.body.content
  };

  const post = await Post.findOneAndUpdate(filter, updates, {
    new: true,
    runValidators: true
  });

  if (!post) {
    return next(new AppError('No post found with that ID, or it is not yours', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { post }
  });
});

exports.upvote = catchAsync(async (req, res, next) => {

  const doc = await Post.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No post found with that ID', 404));
  }

  if (doc.upvotes.some(id => id.equals(req.user._id))) {
    return next(new AppError(
      'You have already upvoted this post',
      400
    ));
  }

  doc.downvotes = doc.downvotes.filter(
    id => !id.equals(req.user._id)
  );

  doc.upvotes.push(req.user._id);

  await doc.save();

  res.status(200).json({
    status: 'success',
    data: { doc }
  });
});

exports.downvote = catchAsync(async (req, res, next) => {

  const doc = await Post.findById(req.params.id);

  if (!doc) {
    return next(new AppError('No post found with that ID', 404));
  }

  if (doc.downvotes.some(id => id.equals(req.user._id))) {
    return next(new AppError(
      'You have already downvoted this post',
      400
    ));
  }

  doc.upvotes = doc.upvotes.filter(
    id => !id.equals(req.user._id)
  );

  doc.downvotes.push(req.user._id);

  await doc.save();

  res.status(200).json({
    status: 'success',
    data: { doc }
  });
});