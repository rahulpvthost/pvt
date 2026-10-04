const express= require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


const router =express.Router();
router.route('/')
.post(userController.createUser);




router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.route('/logout').get(authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);


router.use(authController.protect);

router.route('/updateMyPassword').patch(authController.updatePassword);
router.route('/:id')
.get(userController.getUser)
.delete(userController.deleteUser)
.patch(userController.updateOne);


module.exports= router;