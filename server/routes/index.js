var router = require('express').Router(),
    UserRoutes = require('./user.routes'),
    LeadsRoutes = require('./leaddata.routes'); 
    ReviewRoutes=require('./review.routes')   

router.use('/api/leads', LeadsRoutes);
router.use('/auth', UserRoutes);
router.use('/api/review',ReviewRoutes);

module.exports = router;
