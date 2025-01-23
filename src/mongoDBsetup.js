require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const { getAccessToken } = require('./authCodeWithPkce');
const pass = process.env.CLIENT_PWD;
const user = process.env.CLIENT_USER;
const uri = `mongodb+srv://${user}:${pass}@lmcluster.bthj2ac.mongodb.net/?retryWrites=true&w=majority&appName=lmcluster`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function main() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();  
    
    const database = client.db('terptunes');
    const topTracks = database.collection('tracks');
    const topArtists = database.collection('artists');

    insertUserArtists(client, currentToken.access_token);
    insertUserTracks(client, currentToken.access_token);

    topOverallArtists(client, topArtists);
    topOverallTracks(client, topTracks);

  } catch (err) {
    // catch any errors from trying to connect
    console.error(err);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

main().catch(console.error);

// creating a data pipeline to find the most occurring tracks
async function topOverallTracks(client, topTracks) {
  const pipeline = [
    { $unwind: "$items" },
    { $group: { _id: "$items.uri", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ];

  const topTracksCursor = topTracks.aggregate(pipeline);
  return await topTracksCursor.toArray();
}

// creating a data pipeline to find the most occurring artists
async function topOverallArtists(client, topArtists){
  const pipeline = [
    { $unwind: "$items" },
    { $group: { _id: "$items.uri", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ];

  const topArtistsCursor = topArtists.aggregate(pipeline);
  return await topArtistsCursor.toArray();

}

async function insertUserTracks(client, token) {
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=20", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
  });

  topTracks.insertOne(await response.json()); // ????
}

async function insertUserArtists(client, token) {
  const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=20", {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token },
  });

  topArtists.insertOne(await response.json()); // ????
}