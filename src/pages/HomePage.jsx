import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <>
        <div className='title'>
            <h1>Welcome to GrooveGrid</h1>
<p>Explore a wide range of music genres, albums, 
and songs from various artists.</p>
        </div>
        <div className='image-wrapper'>            
            <Link to='/genre' className='image-link'></Link>
            <Link to='/artists' className='image-link'></Link>
        </div>
        </>
        
    );
        
        
};

export default HomePage;
/* 

 */