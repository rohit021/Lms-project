var router = require('express').Router();
const physicalreviewcontroller = require('../controllers/physicalreview.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, physicalreviewcontroller.createPhysicalReview)
      .get(authenticatateJWT, physicalreviewcontroller.getPhysicalReview) 

router.route('/data:id')
      .put(authenticatateJWT, physicalreviewcontroller.updatePhysicalReview)    
      .delete(authenticatateJWT, physicalreviewcontroller.deletePhysicalReview)  
    
//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,physicalreviewcontroller.getAllPhysicalReview)
      .delete(authenticatateJWT, physicalreviewcontroller.deleteAllPhysicalReviews)  

        //getting rating
// router.route('/rating')
//       .get(authenticatateJWT, physicalreviewcontroller.getratingPhysicalReviews)
      
module.exports = router;
