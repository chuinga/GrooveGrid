import React from "react";
import { Link } from "react-router-dom";

const ArtistList = ({ artists }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // Creates five columns
        gap: "20px", // Space between grid items
        padding: "10px", // Padding around the grid
      }}
    >
      {artists.map((artist) => (
        <div key={artist._id} style={{ textAlign: "center" }}>
          <Link
            to={`/artists/${artist._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={artist.image}
              alt={`${artist.name} thumbnail`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <div>{artist.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArtistList;
