var router = require('express').Router(),
    UserRoutes = require('./user.routes'),
    FormRoutes = require('./formdata.routes');    

router.use('/api/leads', FormRoutes);
router.use('/auth', UserRoutes);

module.exports = router;
