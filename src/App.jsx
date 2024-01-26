import { Routes, Route } from 'react-router-dom';
import { AuthProviderWrapper } from '../src/context/auth.context';

// Components
import Navbar from './components/Navbar';

// Pages
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetails from './components/AlbumDetails';
// import SongsPage from './pages/SongsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Styles
import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/albums' element={<AlbumsPage />} />
                <Route path='/albums/:albumId' element={<AlbumDetails />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
            </Routes>
        </>
    );
}

export default App;

//coment

//coment by Miguel
export default function AppWithAuthProvider() {
    return (
        <AuthProviderWrapper>
            <App />
        </AuthProviderWrapper>
    );
}
