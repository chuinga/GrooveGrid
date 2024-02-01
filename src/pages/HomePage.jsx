import { Link } from "react-router-dom";
import Slider from "react-slick";
// Import Styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";
// Import Images
import djMixerImg from "../assets/hp-dj-mixer.png";
import studioImg from "../assets/hp-studio.png";
import gramophoneImg from "../assets/hp-gramophone.png";
import backgroundImg from "../assets/hp-background.png";

const HomePage = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="title">
        <h1>Welcome to GrooveGrid</h1>
        <p>
          Explore a wide range of music genres, albums, and songs from various
          artists.
        </p>
      </div>
      <Slider {...settings}>
        <div>
          <div className="image-container">
            <img src={backgroundImg} alt="Background" />
            <div className="text-overlay top-left">
              <p>Welcome to GrooveGrid</p>
            </div>
          </div>
        </div>
        <div>
          <div className="image-container">
            <img src={studioImg} alt="Studio" />
            <div className="text-overlay top-right">
              <Link to="/genre" className="overlay-link">
                <p>Explore the Genres here!</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="image-container">
            <img src={gramophoneImg} alt="Gramophone" />
            <div className="text-overlay middle">
              <Link to="/Albums" className="overlay-link">
                <p>Explore the Albums here!</p>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="image-container">
            <img src={djMixerImg} alt="DJ Mixer" />
            <div className="text-overlay left">
              <Link to="/Songs" className="overlay-link">
                <p>Explore the Songs here!</p>
              </Link>
            </div>
          </div>
        </div>
        {/* ...other slides */}
      </Slider>
    </>
  );
};

export default HomePage;
