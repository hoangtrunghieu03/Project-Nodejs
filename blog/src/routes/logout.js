const express = require('express');
const router = express.Router();

const logoutController = require('../app/controllers/LogoutCotroller');

router.get('/', logoutController.checkLogout)


module.exports = router;
