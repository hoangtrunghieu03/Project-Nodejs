const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeCotroller');

// router.get('/', homeController.home)
router.get('/', homeController.search)

module.exports = router;