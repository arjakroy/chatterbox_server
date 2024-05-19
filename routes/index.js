var express = require('express');
var router = express.Router();
const loginSignupController = require('../controllers/login-signup');
const contactController = require('../controllers/contact');

router.post('/api/signup', loginSignupController.signup);

router.post('/api/login', loginSignupController.login);

router.post('/api/saveContact', contactController.saveContact);

router.post('/api/getuser', contactController.sendUSer);

router.post('/api/getContacts', contactController.getContacts);
module.exports = router;
