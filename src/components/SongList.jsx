import { Link } from 'react-router-dom';

const SongsList = ({ songs }) => {
    return (
       <div>
        {songs.map((song) => (
            <div key={song._id}>
                <h3>
                    <Link to={`/songs/${song._id}`}>{song.name}</Link>
                </h3>
        
            </div>
        ))}
       </div> 
    );
};

export default SongsList;