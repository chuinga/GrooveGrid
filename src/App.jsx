import React, { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import AlbumDetails from "./components/AlbumDetails"; // Detail Page
import NotFoundPage from "./pages/NotFoundPage";
/*import SongsPage from "./pages/SongsPage";
import SongDetails from "./components/SongDetails"; // Detaill Page*/
// Styles
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        {/*<Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:songId" element={<SongDetails />} />*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;

//coment
