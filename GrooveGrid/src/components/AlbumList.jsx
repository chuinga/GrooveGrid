import React from "react";
import { Link } from "react-router-dom";

const ArtistList = ({ artists }) => {
  return (
    <div>
      {artists.map((artist) => (
        <div key={artist.id}>
          <h3>
            <Link to={`/artists/${artist.id}`}>
              <img src={artist.imageUrl} alt={`${artist.name} thumbnail`} />
              {artist.name}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
