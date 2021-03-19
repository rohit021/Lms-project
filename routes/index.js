var router = require('express').Router(),
    UserRoutes = require('./user.routes'),
    LeadsRoutes = require('./leaddata.routes');    

router.use('/api/leads', LeadsRoutes);
router.use('/auth', UserRoutes);

module.exports = router;
