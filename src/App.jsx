import { Routes, Route } from "react-router-dom";
import { AuthProviderWrapper } from "../src/context/auth.context";
import { PlaylistsContextProvider } from "./context/Playlists.context";
// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SongDetails from "./components/SongDetails";
import AlbumDetails from "./components/AlbumDetails";
import ArtistsDetails from "./components/ArtistsDetails";
import GenreDetails from "./components/GenreDetails";
import IsPrivate from "./components/IsPrivate";
// Import Pages
import HomePage from "./pages/HomePage";
import AlbumsPage from "./pages/AlbumsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/AboutUs";
import ArtistsPage from "./pages/ArtistsPage";
import GenresPage from "./pages/GenresPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import SongsPage from "./pages/SongsPage";
import PlaylistPage from "./pages/PlaylistPage";
// Import Styles
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:songId" element={<SongDetails />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:artistId" element={<ArtistsDetails />} />
        <Route path="/genre" element={<GenresPage />} />
        <Route path="/genres/:genreId" element={<GenreDetails />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <UserProfilePage />
            </IsPrivate>
          }
        />
        <Route path="/playlists" element={<PlaylistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function AppWithAuthProvider() {
  return (
    <AuthProviderWrapper>
      <PlaylistsContextProvider>
        <App />
      </PlaylistsContextProvider>
    </AuthProviderWrapper>
  );
}
