import { useState, useEffect, useContext } from 'react';
import SongsList from '../components/SongList';
import { AuthContext } from '../context/auth.context';

function SongsPage() {
  const { storedToken } = useContext(AuthContext);
  const [songs, setSongs] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);


  useEffect(() => {
    const fetchSongs = async () => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
                ? import.meta.env.VITE_API_URL.slice(0, -1)
                : import.meta.env.VITE_API_URL;
            const response = await fetch(`${baseUrl}/api/songs`);
            if (!response.ok) throw new Error('Data fetch failed');
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error({ message: 'Error fetching songs', error });
        }
    };
    const fetchUserPlaylists = async () => {
      try {
          const baseUrl = import.meta.env.VITE_API_URL.endsWith('/')
              ? import.meta.env.VITE_API_URL.slice(0, -1)
              : import.meta.env.VITE_API_URL;
          const response = await fetch(`${baseUrl}/api/playlists`, {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${storedToken}`,
              },
          });
          if (!response.ok) throw new Error('Data fetch failed');
          const data = await response.json();
          setUserPlaylists(data);
      } catch (error) {
          console.error({ message: 'Error fetching playlists', error });
      }
  };
  fetchSongs();
        fetchUserPlaylists();
    }, [storedToken]);

    return (
        <div>
            <h1>Songs</h1>
            <SongsList songs={songs} userPlaylists={userPlaylists} />
        </div>
    );
}

export default SongsPage;