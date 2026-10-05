const express= require('express');

const postController = require('../controllers/postcontroller');
const authController = require('../controllers/authController');
const router = express.Router();



router.use(authController.protect);

router.route('/getmy')
    .get(postController.getMyPosts)

router.route('/')
    .post(postController.createpost)
    .get(postController.getAllPosts);

    router.route('/:id')
    .get(postController.getPostById)
    .delete(postController.deletePost)
    .patch(postController.updatePost);

module.exports = router;