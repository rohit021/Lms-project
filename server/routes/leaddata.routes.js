var router = require('express').Router();
const leadcontroller = require('../controllers/leaddata.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(authenticatateJWT, leadcontroller.createLead)
      .put(authenticatateJWT, leadcontroller.updateLead)    
      
router.route('/data/:id')
      .get(authenticatateJWT, leadcontroller.getLead)
      .delete(authenticatateJWT, leadcontroller.deleteLead)  
      
//Multiple Events Routes
router.route('/datas')
      .post(authenticatateJWT,leadcontroller.getAllLeads)       
      .delete(authenticatateJWT, leadcontroller.deleteAllLeads)       

module.exports = router;



