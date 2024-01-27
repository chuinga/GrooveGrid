import { Link } from 'react-router-dom';
import gitHubLogo from '../assets/GitHub-Logo.png';
import Carina from '../assets/Carina.jpg';
import Miguel from "../assets/Miguel.jpg";
import Josip from "../assets/Josip.jpg";
import Victor from '../assets/Victor.jpg';
import linkedinLogo from '../assets/linkedin.jpg';
import '../styles/AboutUs.css'

function AboutUs() {
    return (
        <div>
            <h1>About Us</h1>

           
            <div>
                <h2>Josip Milan</h2>
                <img src={Josip} alt="Josip's Image"></img>
                <p>
                <strong>Josip Milan</strong> A 32-year-old Croatian
                        currently residing in the Netherlands, I have
                        transitioned from a previous career as a chef to embark
                        on a new journey in the field of IT. Embracing the
                        challenges of this career switch, I am thoroughly
                        enjoying the learning process and the opportunities it
                        brings.
                </p>
                <Link to='https://github.com/gudwalMJ'>
                    <img src={gitHubLogo} alt='Github Page'></img>
                </Link>
                <Link to='https://www.linkedin.com/in/josip-milan-4738a9183/'>
                    <img src={linkedinLogo} alt='Linkedin Logo'></img>
                </Link>
            </div>





            <div>
                <h2>Carina França</h2>
                <img src={Carina} alt="Carina's Image"></img>
                <p>
                    <strong>Carina França</strong> I&apos;m Brazilian living
                            in Portugal, I&apos;m 28 years old, with a background in
                            pharmacy. I&apos;m changing careers to IT and really
                            enjoying the process.
                </p>
                <Link to='https://github.com/Ksfraan'>
                    <img src={gitHubLogo} alt='Github Page'></img>
                </Link>
                <Link to='https://www.linkedin.com/in/carina-fran%C3%A7a-915b11196/'>
                    <img src={linkedinLogo} alt='Linkedin Logo'></img>
                </Link>
            </div>



            <div>
                <h4>Miguel Martins </h4>
                <img src={Miguel} alt="Miguel's Image"></img>
                <p>
                <strong>Miguel Martins</strong> When I'm not immersed in code, you'll often find me tearing up the trails on my downhill bike, embracing the thrill of speed and adventure.
                                                Downhill biking isn't just a hobby—it's a lifestyle that keeps me grounded and energized.
                                                Outside the realm of technology, I find solace in composing music, blending melodies and harmonies to create captivating soundscapes. 
                                                Whether it's tinkering on the piano or experimenting with digital music production tools, music is my ultimate form of expression.
                </p>
                <Link to='https://github.com/chuinga'>
                    <img src={gitHubLogo} alt='Github Page'></img>
                </Link>
                <Link to='https://www.linkedin.com/in/miguel-martins-a08a76a5/'>
                    <img src={linkedinLogo} alt='Linkedin Logo'></img>
                </Link>
            </div>



            <div>
                <h5>Victor Silva</h5>
                <img src={Victor} alt="Victor's Image"></img>
                <p>
                <strong>Victor Silva</strong> I was born in Brazil but came to Portugal when I was five years old,
                        since then I have lived in Lisbon. I have a background in Management,
                        but I have always been interested in technology, which is why I
                        decided not to pursue the area of economics. I really like playing
                        football and playing computer games.
                </p>
                <Link to='https://github.com/Vini1602'>
                    <img src={gitHubLogo} alt='Github Page'></img>
                </Link>
                <Link to='https://www.linkedin.com/in/victor-silva1602/'>
                    <img src={linkedinLogo} alt='Linkedin Logo'></img>
                </Link>
            </div>







        </div>
    );
}

export default AboutUs;
