const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Function to fetch Taylor Swift data
const fetchTaylorSwiftData = async () => {
  try {
    // Fetching Taylor Swift's artist information
    const artistResponse = await axios.get(`https://api.deezer.com/search/artist?q=Taylor%20Swift`);
    const artist = artistResponse.data.data[0];

    if (!artist) {
      throw new Error('Taylor Swift not found');
    }

    // Fetching albums
    const albumsResponse = await axios.get(`https://api.deezer.com/artist/${artist.id}/albums`);
    const albums = albumsResponse.data.data;

    // Remove the singles fetching logic
    // const singlesResponse = await axios.get(`https://api.deezer.com/artist/${artist.id}/tracks`);
    // const singles = singlesResponse.data.data;

    return { artist, albums };
  } catch (error) {
    throw new Error('Error fetching Taylor Swift data: ' + error.message);
  }
};

// Function to fetch album details
const fetchAlbumDetails = async (albumId) => {
  try {
    const response = await axios.get(`https://api.deezer.com/album/${albumId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching album details: ' + error.message);
  }
};

// Route to get Taylor Swift's data
app.get('/api/taylor-swift', async (req, res) => {
  try {
    const data = await fetchTaylorSwiftData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

// Route to get album details
app.get('/api/album/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchAlbumDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching album details', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
