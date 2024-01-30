import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/artists/${artistId}`
        );
        if (!response.ok) throw new Error("Artist fetch failed");
        const data = await response.json();
        console.log(data);
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (!artist) return <div>Loading...</div>;

  return (
    <div>
      <h1>Artist Details</h1>
      <h2>{artist.name}</h2>
      <img src={artist.image} alt={`${artist.name} thumbnail`} />
      <p>Genre: {artist.genre.name}</p>
      <div>
        <h3>Albums:</h3>
        <ul>
          {artist.albums.map((album) => (
            <li key={album._id}>
              <Link to={`/albums/${album._id}`}>{album.title}</Link>- Released:
              {new Date(album.releaseDate).toLocaleDateString()}
              {/* More album details here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistDetails;
