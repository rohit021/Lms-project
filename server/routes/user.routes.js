var router = require('express').Router();
const usercontroller = require('../controllers/user.controller');

// Single event Routes
router.route('/register')
      .post(usercontroller.createUser)

router.route('/login')
      .post(usercontroller.loginUser)

router.route('/reset-password')
      .post(usercontroller.resetPassword)
      
router.route('/reset/:token').
      get(usercontroller.validateResetToken);

router.route('/reset/:token').
      post(usercontroller.newPassword);
      
router.route('/logout')
      .get(usercontroller.logOutUser)

router.route('/loggedIn')
      .get(usercontroller.loggedIn)
      
router.route('/getusers')
      .get(usercontroller.getAllUsers)       

router.route('/deleteAll')
      .delete(usercontroller.deleteAllUsers)  
      
module.exports = router;



