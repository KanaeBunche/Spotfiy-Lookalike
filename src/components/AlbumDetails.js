import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AlbumDetails.css'; // Import CSS file

const AlbumDetails = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/album/${id}`);
        setAlbum(response.data);
      } catch (error) {
        setError('Error fetching album data');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id]);

  return (
    <div className="album-details-container">
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="album-details">
          <img src={album.cover_medium} alt={album.title} className="album-cover" />
          <h1>{album.title}</h1>
          <p>{album.artist.name}</p>
          <div className="tracks">
            <h2>Songs</h2>
            <ul>
              {album.tracks.data.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
