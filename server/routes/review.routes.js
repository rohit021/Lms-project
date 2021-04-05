var router = require('express').Router();
const reviewcontroller = require('../controllers/review.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, reviewcontroller.createReview)
      .get(authenticatateJWT, reviewcontroller.getReview) 
      .put(authenticatateJWT, reviewcontroller.updateReview)    
      .delete(authenticatateJWT, reviewcontroller.deleteReview)  
    
router.route('/data:id')
      .put(authenticatateJWT, reviewcontroller.updateReview)    
      .delete(authenticatateJWT, reviewcontroller.deleteReview)  
    
//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,reviewcontroller.getAllReview)
      .delete(authenticatateJWT, reviewcontroller.deleteAllReviews)  

        //getting rating
router.route('/rating')
      .get(authenticatateJWT, reviewcontroller.getratingReviews)
      
module.exports = router;
