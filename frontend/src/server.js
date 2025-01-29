// server.js
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config({ path: './database.env' });

const app = express();
app.use(cors());
app.use(express.json());

const mongoUser = process.env.CLIENT_USER;
const mongoPass = process.env.CLIENT_PWD;
const uri = `mongodb+srv://${mongoUser}:${mongoPass}@lmcluster.bthj2ac.mongodb.net/?retryWrites=true&w=majority&appName=lmcluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB when server starts
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

connectDB();

// API Routes
app.post('/api/user/top-items', async (req, res) => {
  try {
    const { tracks, artists } = req.body;
    const database = client.db('terptunes');
    const topTracks = database.collection('tracks');
    const topArtists = database.collection('artists');

    // Insert user's top tracks and artists
    await Promise.all([
      topTracks.insertOne({ items: tracks }),
      topArtists.insertOne({ items: artists })
    ]);

    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Failed to save user data' });
  }
});

app.get('/api/compare', async (req, res) => {
  try {
    const database = client.db('terptunes');
    const topTracks = database.collection('tracks');
    const topArtists = database.collection('artists');

    const [overallTopTracks, overallTopArtists] = await Promise.all([
      topOverallTracks(topTracks, 20),
      topOverallArtists(topArtists, 20)
    ]);

    res.json({
      topTracks: overallTopTracks,
      topArtists: overallTopArtists
    });
  } catch (error) {
    console.error('Error getting comparison data:', error);
    res.status(500).json({ error: 'Failed to get comparison data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Your existing helper functions
async function topOverallTracks(topTracks, limit) {
  const pipeline = [
    { $unwind: "$items" },
    { $group: { _id: "$items.id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ];

  const topTracksCursor = topTracks.aggregate(pipeline);
  return await topTracksCursor.toArray();
}

async function topOverallArtists(topArtists, limit) {
  const pipeline = [
    { $unwind: "$items" },
    { $group: { _id: "$items.id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit }
  ];

  const topArtistsCursor = topArtists.aggregate(pipeline);
  return await topArtistsCursor.toArray();
}