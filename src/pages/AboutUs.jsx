import { Link } from 'react-router-dom';
// Import Images
import gitHubLogo from '../assets/GitHub-Logo.png';
import Carina from '../assets/Carina.jpg';
// import Miguel from "../assets/Miguel.jpg";
// import Josip from "../assets/Josip.jpg";
import victor from '../assets/Victor.jpg';
import linkedinLogo from '../assets/linkedin.jpg';

function AboutUs() {
    return (
        <div>
            <h1>About Us</h1>
            <div>
                <h3>Josip Milan</h3>

                <div>
                    <Link to=''>
                        <img src={gitHubLogo} alt='Github Page'></img>
                    </Link>
                    <Link to=''>
                        <img src={linkedinLogo} alt='Linkedin Logo'></img>
                    </Link>
                </div>
            </div>
            <div>
                <h3>Victor Silva</h3>
                <img src={victor} alt="Victor's Image"></img>
                <p>My name is Victor Silva, I am 24 years old.</p>
                <p>
                    I was born in Brazil but came to Portugal when I was five
                    years old, since then I have lived in Lisbon. I have a
                    background in Management, but I have always been interested
                    in technology, which is why I decided not to pursue the area
                    of economics. I really like playing football and playing
                    computer games.
                </p>
                <Link to='https://github.com/Vini1602'>
                    <img src={gitHubLogo} alt='Github Page'></img>
                </Link>
                <Link to='https://www.linkedin.com/in/victor-silva-17a53b196'>
                    <img src={linkedinLogo} alt='Linkedin Logo'></img>
                </Link>
            </div>

            <div>
                <h3>Carina França</h3>
                <img src={Carina} alt="Carina's Picture"></img>

                <div>
                    <Link to='https://github.com/ksfraan'>
                        <img src={gitHubLogo} alt='Github Page'></img>
                    </Link>
                    <Link to=''>
                        <img src={linkedinLogo} alt='Linkedin Logo'></img>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
