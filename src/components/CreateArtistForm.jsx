/* eslint-disable react/prop-types */
import { useState } from 'react';

const CreateArtistForm = ({ onCreateArtist, genres }) => {
    const [artistData, setArtistData] = useState({
        name: '',
        genre: '',
        image: '',
    });

    const handleInputChange = (e) => {
        setArtistData({
            ...artistData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreateArtist(artistData);

        setArtistData({
            name: '',
            genre: '',
            image: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className='create-artist-form-wrapper'>
            <label>
                Name:
                <input
                    type='text'
                    name='name'
                    value={artistData.name}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                Genre:
                <select
                    name='genre'
                    value={artistData.genre}
                    onChange={handleInputChange}
                >
                    {genres.map((genre) => (
                        <option value={genre._id} key={genre._id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </label>
            <label>
                Image:
                <input
                    type='text'
                    name='image'
                    value={artistData.image}
                    onChange={handleInputChange}
                />
            </label>
            <button type='submit'>Create Artist</button>
        </form>
    );
};

export default CreateArtistForm;
