const express = require('express');
const router = express.Router();
const boardFunctions = require('../utils/BoardFunctions');

// test endpoint
router.get('/test', (req, res) => {
  return res.status(400).json({
    success: true,
    message: "Move validation test endpoint successfully reached"
  })
});

module.exports = router; 
