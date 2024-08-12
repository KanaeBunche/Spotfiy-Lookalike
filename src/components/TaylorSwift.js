import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaylorSwift.css'; // Import CSS file

const TaylorSwift = () => {
  const [data, setData] = useState({ artist: {}, albums: [], singles: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/taylor-swift');
        console.log(response.data); // Log data to verify structure
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="taylor-swift-container">
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="artist-info">
          <h1>{data.artist.name || 'Artist Name'}</h1>
          <div className="albums-section">
            <h2>Albums</h2>
            <div className="albums-list">
              {Array.isArray(data.albums) && data.albums.length > 0 ? (
                data.albums.map((album) => (
                  <Link to={`/album/${album.id}`} key={album.id} className="album">
                    <img src={album.cover_medium} alt={album.title} />
                    <p>{album.title}</p>
                  </Link>
                ))
              ) : (
                <p>No albums found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaylorSwift;
