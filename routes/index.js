var router = require('express').Router(),
    UserRoutes = require('./user.routes'),
    FormRoutes = require('./formdata.routes');    

router.use('/api/form', FormRoutes);
router.use('/auth', UserRoutes);

module.exports = router;
