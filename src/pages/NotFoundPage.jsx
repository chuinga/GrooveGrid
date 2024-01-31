import { Link } from 'react-router-dom';
import NotFound from '../assets/404.png'
import '../styles/NotFound.css'

const NotFoundPage = () => {
    return (
        <div className='notFound'>
            <img src={NotFound} alt="404 Not Found" />
            <button>
                <Link to='/'>Go Home</Link>
            </button>
        </div>
    );
};

export default NotFoundPage;
