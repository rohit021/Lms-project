var router = require('express').Router(),
    UserRoutes = require('./user.routes'),
    LeadsRoutes = require('./leaddata.routes'); 
    ListRoutes = require('./lists.routes'); 
    PhysicalReviewRoutes = require('./physicalreview.routes'); 
    ReviewRoutes=require('./review.routes')   

router.use('/api/leads', LeadsRoutes);
router.use('/api/lists', ListRoutes);
router.use('/auth', UserRoutes);
router.use('/api/review',ReviewRoutes);
router.use('/api/physical-review',PhysicalReviewRoutes);

module.exports = router;
