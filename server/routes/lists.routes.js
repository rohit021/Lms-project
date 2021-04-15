var router = require('express').Router();
const listcontroller = require('../controllers/list.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/anardana-outlets')
      .post(authenticatateJWT, listcontroller.setAnardanaOutlets)
      .get(authenticatateJWT, listcontroller.getAnardanaOutlets)    
      
// router.route('/data/:id')
//       .get(authenticatateJWT, leadcontroller.getLead)
//       .delete(authenticatateJWT, leadcontroller.deleteLead)  
      
// //Multiple Events Routes
// router.route('/datas')
//       .post(authenticatateJWT,leadcontroller.getAllLeads)       
//       .delete(authenticatateJWT, leadcontroller.deleteAllLeads)       

module.exports = router;



