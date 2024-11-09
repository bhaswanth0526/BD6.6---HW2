let request = require('supertest');
let { app } = require('../index.js');
let { getAllGames, getGamesById } = require('../controllers');
let http = require('http');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
  getGamesById: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3000, done)
});

afterAll((done) => {
  server.close(done);
});

describe('Controllers Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all games', () => {
    let mockGames = [
      {
        'gameId': 1,
        'title': 'The Legend of Zelda: Breath of the Wild',
        'genre': 'Adventure',
        'platform': 'Nintendo Switch'
      },
      {
        'gameId': 2,
        'title': 'Red Dead Redemption 2',
        'genre': 'Action',
        'platform': 'PlayStation 4'
      },
      {
        'gameId': 3,
        'title': 'The Witcher 3: Wild Hunt',
        'genre': 'RPG',
        'platform': 'PC'
      }
    ];

    getAllGames.mockReturnValue(mockGames);
    let result = getAllGames();
    expect(result).toEqual(mockGames);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET /games should get all games', async () => {
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          'gameId': 1,
          'title': 'The Legend of Zelda: Breath of the Wild',
          'genre': 'Adventure',
          'platform': 'Nintendo Switch'
        },
        {
          'gameId': 2,
          'title': 'Red Dead Redemption 2',
          'genre': 'Action',
          'platform': 'PlayStation 4'
        },
        {
          'gameId': 3,
          'title': 'The Witcher 3: Wild Hunt',
          'genre': 'RPG',
          'platform': 'PC'
        }
      ]      
    });
    expect(res.body.games.length).toBe(3);
  });

  it('GET /games/details/:id should get a game by ID', async () => {
    const mockGame = {
      'gameId': 1,
      'title': 'The Legend of Zelda: Breath of the Wild',
      'genre': 'Adventure',
      'platform': 'Nintendo Switch'
    };

    getGamesById.mockResolvedValue(mockGame);
    const res = await request(server).get('/games/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: mockGame
    });
  });
});