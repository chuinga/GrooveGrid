import React from "react";
import { Link } from "react-router-dom";

const ArtistList = ({ artists }) => {
  return (
    <div>
      {artists.map((artist) => (
        <div key={artist._id}>
          <h3>
            <Link to={`/artists/${artist._id}`}>{artist.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
