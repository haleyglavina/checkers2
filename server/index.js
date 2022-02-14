const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Connect routes
const moveValidationRoutes = require('./routes/moveValidation');
const gameRoutes = require('./routes/game');

// Middleware
app.use(express());
app.use(cors());
app.use(express.json());
app.use('/moveValidation', moveValidationRoutes);
app.use('/game', gameRoutes);

// Start server
app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));
