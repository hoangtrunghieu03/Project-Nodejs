const express = require('express');
const router = express.Router();

const registerController = require('../app/controllers/RegisterCotroller');

router.get('/', registerController.register)
router.post('/', registerController.checkregister)

module.exports = router;
