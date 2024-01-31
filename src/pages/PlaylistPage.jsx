import { useContext } from "react";
import { PlaylistsContext } from "../context/Playlists.context";
// Import Components
import PlaylistList from "../components/PlaylistList";

const PlaylistPage = () => {
  const { playlists, isLoading } = useContext(PlaylistsContext);

  return (
    <div>
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
