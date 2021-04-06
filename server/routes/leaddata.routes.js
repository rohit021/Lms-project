var router = require('express').Router();
const leadcontroller = require('../controllers/leaddata.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, leadcontroller.createLead)
      .get(authenticatateJWT, leadcontroller.getLead)
      .put(authenticatateJWT, leadcontroller.updateLead)     
      .delete(authenticatateJWT, leadcontroller.deleteLead)       
      
//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,leadcontroller.getAllLeads)       
      .delete(authenticatateJWT, leadcontroller.deleteAllLeads)       

module.exports = router;



