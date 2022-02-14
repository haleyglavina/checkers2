const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');
const gameData = require('../data/games.json');
const boardSetup = require('../utils/BoardTestSetup');
// import { emptyBoard } from '../utils/BoardTestSetup';

// test endpoint
router.get('/test', (req, res) => {
  return res.status(400).json({
    success: true,
    message: "Game test endpoint successfully reached"
  })
});

// Create a new game ID and create board object
// return gameID, initial board, 
router.get('/newGame', (req, res) => {

  let newGame = {
    gameId: uuid(),
    names: {
      p1: "Playa 1",
      p2: "Playa 2"
    },
    scores: {
      p1: 0,
      p2: 0
    },
    board: boardSetup.emptyBoard(8)
  };

  gameData.push(newGame);

  return res.status(400).json({
    success: true,
    newGame: newGame
  })
});

// Finish a game and remove game ID and board
router.post('/endGame/:id', (req, res) => {

  return res.status(400).json({
    success: true,
    message: "Game test endpoint successfully reached"
  })
});

module.exports = router; 