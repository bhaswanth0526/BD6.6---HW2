const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const { getAllGames, getGamesById } = require('./controllers');

app.get('/games', async (req, res) => {
  let games = getAllGames();
  res.json({games});
});

app.get('/games/details/:id', async (req, res) => {
  let game = await getGamesById(parseInt(req.params.id));
  res.json({game,});
});

module.exports = { app };