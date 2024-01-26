import React from "react";
import { Link } from "react-router-dom";

const AlbumList = ({ albums }) => {
  return (
    <div>
      {albums.map((album) => (
        <div key={album._id}>
          <h3>
            <Link to={`/albums/${album._id}`}>{album.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
