const express= require('express');
const upload = require('../utils/upload');
const postController = require('../controllers/postcontroller');
const authController = require('../controllers/authController');
const router = express.Router();



router.use(authController.protect);

router.route('/getmy')
    .get(postController.getMyPosts)

router.route('/')
    .post(upload.single('image'),postController.createpost)
    .get(postController.getAllPosts);

    router.route('/:id')
    .get(postController.getPostById)
    .delete(postController.deletePost)
    .patch(postController.updatePost);

    router.route('/:id/upvote')
    .patch(postController.upvote)
    
    router.route('/:id/downvote')
    .patch(postController.downvote);

module.exports = router;