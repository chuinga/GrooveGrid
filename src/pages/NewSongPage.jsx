import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from 'react-router-dom';

const NewSongPage = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const { storedToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        const SongToCreate = { title, artist, album, genre };

        try {
            const response = await storedToken('/songs', 'POST', SongToCreate);
            if (response.status === 201) {
                const song = await response.json();
                navigate(`/songs/${song._id}`);
            }            
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <h1>Add New Song</h1>          
            <form action='submit' onSubmit={handleSubmit}>
                <label htmlFor='title'>Title:</label>
                <input type="text" value={title} id='title' 
                onChange={event => setTitle(event.target.value)} />
                <label htmlFor='title'>Artist:</label>
                <select value={artist} id='artist' onChange={event => 
                    setArtist(event.target.value)}>
                    <option value="">Select Artist</option>
                    {artist.map(artist => (
                        <option key={artist._id} value={artist._id}>
                            {artist.name}</option>))}
                </select>
                <label htmlFor='title'>Album:</label>
                <select value={album} id='album' onChange={event => 
                    setAlbum(event.target.value)}>
                    <option value="">Select Album</option>
                    {album.map(album => (
                        <option key={album._id} value={album._id}>
                            {album.name}</option>))}
                </select>
                <label htmlFor='title'>Genre:</label>
                <select value={genre} id='genre' onChange={event => 
                    setGenre(event.target.value)}>
                    <option value="">Select Genre</option>
                    {genre.map(genre => (
                        <option key={genre._id} value={genre._id}>
                            {genre.name}</option>))}
                </select>                                
            </form>      
        </>
    )
}



export default NewSongPage;