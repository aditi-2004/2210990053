const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculator');

router.get('/numbers/:numberId', calculatorController.getNumbers);
router.post('/calculate-average', calculatorController.calculateAverage);
router.get('/health', calculatorController.healthCheck);

module.exports = router;