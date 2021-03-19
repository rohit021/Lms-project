var router = require('express').Router();
const leadcontroller = require('../controllers/leaddata.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(leadcontroller.createLead)
      .get(leadcontroller.getLead)       
      .put(leadcontroller.updateLead)     
      .delete(leadcontroller.deleteLead)       

//Multiple Events Routes
router.route('/datas')
      .get(authenticatateJWT,leadcontroller.getAllLeads)       
      .delete(leadcontroller.deleteAllLeads)       

module.exports = router;



