var router = require('express').Router();
const physicalreviewcontroller = require('../controllers/physicalreview.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, physicalreviewcontroller.createPhysicalReview)
      .put(authenticatateJWT, physicalreviewcontroller.updatePhysicalReview)    
            
router.route('/data/:id')
      .get(authenticatateJWT, physicalreviewcontroller.getPhysicalReview)
      .delete(authenticatateJWT, physicalreviewcontroller.deletePhysicalReview)  

//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,physicalreviewcontroller.getAllPhysicalReview)
      .delete(authenticatateJWT, physicalreviewcontroller.deleteAllPhysicalReviews)  

        //getting rating
// router.route('/rating')
//       .get(authenticatateJWT, physicalreviewcontroller.getratingPhysicalReviews)
      
module.exports = router;
