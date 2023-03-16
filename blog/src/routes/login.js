const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginCotroller');

router.get('/', loginController.login)
router.post('/', loginController.checklogin)


module.exports = router;
