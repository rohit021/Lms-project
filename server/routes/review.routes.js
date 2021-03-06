var router = require('express').Router();
const reviewcontroller = require('../controllers/review.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, reviewcontroller.createReview)
      .put(authenticatateJWT, reviewcontroller.updateReview) 
  
router.route('/data/:id')
      .get(authenticatateJWT, reviewcontroller.getReview) 
      .delete(authenticatateJWT, reviewcontroller.deleteReview)  

//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,reviewcontroller.getAllReview)
      .delete(authenticatateJWT, reviewcontroller.deleteAllReviews)  

//getting rating
router.route('/rating')
      .post(authenticatateJWT, reviewcontroller.getReviewNps)

router.route('/total_reviews')
      .get(reviewcontroller.getTotalReviews) 

module.exports = router;
