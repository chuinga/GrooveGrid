import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";
import djMixerImg from "../assets/dj-mixer.png";
import studioImg from "../assets/studio.png";

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
          <img src={djMixerImg} alt="DJ Mixer" />
        </div>
        <div>
          <img src={studioImg} alt="Studio" />
        </div>
        {/* ...other slides */}
      </Slider>
    </>
  );
};

export default HomePage;
/* 

 */
