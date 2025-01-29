// server.js (Backend server)
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

dotenv.config(); // Load environment variables

const app = express();
const port = 5000; // Port for the server

const mongoUser = process.env.CLIENT_USER;
const mongoPass = process.env.CLIENT_PWD;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@lmcluster.bthj2ac.mongodb.net/?retryWrites=true&w=majority&appName=lmcluster`;

app.use(express.json()); // Parse JSON bodies

// Example route for fetching user data from MongoDB
app.get('/api/user-data', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('terptunes');
    const topTracks = database.collection('tracks');
    const userTracks = await topTracks.find({}).toArray();
    res.json(userTracks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

// Example route for handling Spotify token exchange
app.post('/api/spotify-token', async (req, res) => {
  const { code, code_verifier } = req.body;
  // Implement your token exchange logic here (similar to the function in your original code)
  res.json({ access_token: 'mock_access_token', refresh_token: 'mock_refresh_token' });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
