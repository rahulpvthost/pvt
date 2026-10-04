const express= require('express');

const postController = require('../controllers/postcontroller');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router.route('/')
.post(postController.createpost);  


module.exports = router;