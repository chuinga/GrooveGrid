import { Link } from "react-router-dom";

const AlbumList = ({ albums }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)", // Creates five columns
        gap: "20px", // Space between grid items
        padding: "10px", // Padding around the grid
      }}
    >
      {Array.isArray(albums) && albums.length > 0 ? (
        albums.map((album) => (
          <div key={album._id} style={{ textAlign: "center" }}>
            <Link
              to={`/albums/${album._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {album.coverImageUrl && (
                <img
                  src={album.coverImageUrl}
                  alt={`${album.title} cover`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
              )}
              <div>{album.title}</div>
            </Link>
          </div>
        ))
      ) : (
        <p>No albums available.</p>
      )}
    </div>
  );
};

export default AlbumList;
