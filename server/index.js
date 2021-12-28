const express = require('express');
const app = express();
const {v4: uuid} = require('uuid');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));