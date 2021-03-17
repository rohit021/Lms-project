var router = require('express').Router();
const formcontroller = require('../controllers/formdata.controller');
const { authenticatateJWT } = require('../middleware/auth');

// Single event Routes
router.route('/data')
      .post(formcontroller.createForm)
      .get(formcontroller.getForm)       
      .put(formcontroller.updateForm)     
      .delete(formcontroller.deleteForm)       

//Multiple Events Routes
router.route('/datas')
      .get(authenticatateJWT,formcontroller.getAllForms)       
      .delete(formcontroller.deleteAllForms)       

module.exports = router;



