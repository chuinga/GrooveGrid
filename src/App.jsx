import { Routes, Route } from 'react-router-dom';
import { AuthProviderWrapper } from '../src/context/auth.context';
import { PlaylistsContextProvider } from './context/Playlists.context';
// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetails from './components/AlbumDetails';
import NotFoundPage from './pages/NotFoundPage';
import AboutUs from './pages/AboutUs';
import ArtistsPage from './pages/ArtistsPage';
import ArtistsDetails from './components/ArtistsDetails';
import GenresPage from './pages/GenresPage';
import GenreDetails from './components/GenreDetails';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserProfilePage from './pages/UserProfilePage';
import IsPrivate from './components/IsPrivate';
import SongsPage from './pages/SongsPage';
import SongDetails from './components/SongDetails';
import PlaylistPage from './pages/PlaylistPage';
import Footer from './components/Footer';
// Styles
import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/albums' element={<AlbumsPage />} />
                <Route path='/albums/:albumId' element={<AlbumDetails />} />
                <Route path='/songs' element={<SongsPage />} />
                <Route path='/songs/:songId' element={<SongDetails />} />
                <Route path='/artists' element={<ArtistsPage />} />
                <Route path='/artists/:artistId' element={<ArtistsDetails />} />
                <Route path='/genre' element={<GenresPage />} />
                <Route path='/genres/:genreId' element={<GenreDetails />} />
                <Route
                    path='/profile'
                    element={
                        <IsPrivate>
                            <UserProfilePage />
                        </IsPrivate>
                    }
                />
                <Route path='/playlists' element={<PlaylistPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/about' element={<AboutUs />} />
                <Route path='*' element={<NotFoundPage />} />
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
