import { Router, Routes, Route } from "react-router-dom";
import { AuthProviderWrapper } from '../src/context/auth.context';
// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from "./pages/HomePage";
import AlbumsPage from './pages/AlbumsPage';
import AlbumDetails from './components/AlbumDetails';
import NotFoundPage from "./pages/NotFoundPage";
/*import SongsPage from "./pages/SongsPage";
import SongDetails from "./components/SongDetails"; // Detail Page*/
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Styles
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        {/* <Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:songId" element={<SongDetails />} /> */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
