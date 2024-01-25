import React, { useState } from "react";
import { Router, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/Navbar";

// Pages
import AlbumsPage from "./pages/AlbumsPage";
import AlbumDetails from "./components/AlbumDetails"; // Detail Page

// Styles
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
      </Routes>
    </>
  );
}

export default App;
