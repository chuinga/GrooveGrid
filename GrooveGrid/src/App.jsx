import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AlbumsPage from "./pages/AlbumsPage.jsx";
import AlbumDetails from "./components/AlbumDetails.jsx";
import ArtistsPage from "./pages/ArtistsPage.jsx";
import ArtistsDetails from "./components/ArtistsDetails.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<ArtistsDetails />} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
