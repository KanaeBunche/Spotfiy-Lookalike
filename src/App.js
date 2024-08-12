import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaylorSwift from './components/TaylorSwift'
import AlbumDetails from './components/AlbumDetails'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaylorSwift />} />
        <Route path="/album/:id" element={<AlbumDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
