import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProviderWrapper } from "../src/context/auth.context";

// Components
import Navbar from "./components/Navbar";

// Pages
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import AlbumDetails from "./components/AlbumDetails";
//import SongsPage from './pages/SongsPage';

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        {/* <Route path="/songs" element={<SongsPage />} /> */}
        {/*<Route path="/songs/:songId" element={<SongDetails />} />*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default function AppWithAuthProvider() {
  return (
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  );
}
