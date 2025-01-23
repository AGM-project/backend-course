const express = require('express');
const { getHello, postValidateInput } = require('../controllers/apiController');
const router = express.Router();
router.get('/', getHello);
router.post('/validate', postValidateInput);
module.exports = router;