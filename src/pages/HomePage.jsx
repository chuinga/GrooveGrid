/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
// Import Styling
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/HomePage.css';
// Import Images
import djMixerImg from '../assets/hp-dj-mixer.png';
import studioImg from '../assets/hp-studio.png';
import gramophoneImg from '../assets/hp-gramophone.png';
import backgroundImg from '../assets/hp-background.png';

const HomePage = () => {
    // Settings for the slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    // Custom Arrow components
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'transparent',
                }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: 'block',
                    background: 'transparent',
                }}
                onClick={onClick}
            />
        );
    }
    return (
        <>
            <Slider {...settings}>
                <div>
                    <div className='image-container'>
                        <img src={backgroundImg} alt='Background' />
                        <div className='text-overlay top-left'>
                            <h1 className='home-page-title'>
                                Welcome to GrooveGrid
                            </h1>
                            <p className='home-page-p'>
                                Explore music genres, albums and artists.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='image-container'>
                        <img src={studioImg} alt='Studio' />
                        <div className='text-overlay top-right'>
                            <Link to='/genre' className='overlay-link'>
                                <p>Explore the Genres here!</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='image-container'>
                        <img src={gramophoneImg} alt='Gramophone' />
                        <div className='text-overlay middle'>
                            <Link to='/Albums' className='overlay-link'>
                                <p>Explore the Albums here!</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='image-container'>
                        <img src={djMixerImg} alt='DJ Mixer' />
                        <div className='text-overlay left'>
                            <Link to='/Songs' className='overlay-link'>
                                <p>Explore the Songs here!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </>
    );
};

export default HomePage;
