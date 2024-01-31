// PlaylistPage.jsx
import { useContext } from 'react';
import { PlaylistsContext } from '../context/Playlists.context';

import PlaylistList from '../components/PlaylistList';

const PlaylistPage = () => {
    const { playlists, isLoading } = useContext(PlaylistsContext);

    return (
        <div className='playlist-page-wrapper'>
            <h5>Playlists</h5>
            {!isLoading ? (
                <PlaylistList playlists={playlists} />
            ) : (
                <div>LOADING...</div>
            )}
        </div>
    );
};

export default PlaylistPage;
