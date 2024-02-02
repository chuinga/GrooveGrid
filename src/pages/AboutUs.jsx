/* eslint-disable react/no-unescaped-entities */

import { Link } from 'react-router-dom';
import gitHubLogo from '../assets/GitHub-Logo.png';
import Carina from '../assets/Carina.jpg';
import Miguel from '../assets/Miguel.jpg';
import Josip from '../assets/Josip.jpg';
import Victor from '../assets/Victor.jpg';
import linkedinLogo from '../assets/linkedin.jpg';
import '../styles/AboutUs.css';

function AboutUs() {
    return (
        <div className='about'>
            <h1>About Us</h1>

            <div className='about-member'>
                <div className='about-image-container'>
                    <img
                        className='about-image'
                        src={Josip}
                        alt="Josip's Image"
                    />
                </div>
                <div className='about-description'>
                    <h2 className='about-Josip'>Josip Milan</h2>
                    <p>
                        A 32-year-old Croatian currently residing in the
                        Netherlands, I have transitioned from a previous career
                        as a chef to embark on a new journey in the field of IT.
                        Embracing the challenges of this career switch, I am
                        thoroughly enjoying the learning process and the
                        opportunities it brings.
                    </p>
                    <div className='about-links'>
                        <Link to='https://github.com/gudwalMJ'>
                            <img
                                className='about-logo'
                                src={gitHubLogo}
                                alt='Github Page'
                            />
                        </Link>
                        <Link to='https://www.linkedin.com/in/josip-milan-4738a9183/'>
                            <img
                                className='about-logo'
                                src={linkedinLogo}
                                alt='Linkedin Logo'
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='about-member'>
                <div className='about-image-container'>
                    <img
                        className='about-image'
                        src={Carina}
                        alt="Carina's Image"
                    />
                </div>
                <div className='about-description'>
                    <h2 className='about-carina'>Carina França</h2>
                    <p>
                        I'm a Brazilian living in Portugal, I&apos;m 28 years
                        old, with a background in pharmacy. I&apos;m changing
                        careers to IT and really enjoying the process.
                    </p>
                    <div className='about-links'>
                        <Link to='https://github.com/Ksfraan'>
                            <img
                                className='about-logo'
                                src={gitHubLogo}
                                alt='Github Page'
                            />
                        </Link>
                        <Link to='https://www.linkedin.com/in/carina-fran%C3%A7a-915b11196/'>
                            <img
                                className='about-logo'
                                src={linkedinLogo}
                                alt='Linkedin Logo'
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='about-member'>
                <div className='about-image-container'>
                    <img
                        className='about-image'
                        src={Miguel}
                        alt="Miguel's Image"
                    />
                </div>
                <div className='about-description'>
                    <h4 className='about-miguel'>Miguel Martins</h4>
                    <p>
                        When I'm not immersed in code, you'll often find me
                        tearing up the trails on my downhill bike, embracing the
                        thrill of speed and adventure. Downhill biking isn't
                        just a hobby it's a lifestyle that keeps me grounded and
                        energized. Outside the realm of technology, I find
                        solace in composing music, blending melodies and
                        harmonies to create captivating soundscapes. 
                    </p>
                    <div className='about-links'>
                        <Link to='https://github.com/chuinga'>
                            <img
                                className='about-logo'
                                src={gitHubLogo}
                                alt='Github Page'
                            />
                        </Link>
                        <Link to='https://www.linkedin.com/in/miguel-martins-a08a76a5/'>
                            <img
                                className='about-logo'
                                src={linkedinLogo}
                                alt='Linkedin Logo'
                            />
                        </Link>
                    </div>
                </div>
            </div>

            <div className='about-member'>
                <div className='about-image-container'>
                    <img
                        className='about-image'
                        src={Victor}
                        alt="Victor's Image"
                    />
                </div>
                <div className='about-description'>
                    <h5 className='about-victor'> Victor Silva</h5>
                    <p>
                        I was born in Brazil but came to Portugal when I was
                        five years old, since then I have lived in Lisbon. I
                        have a background in Management, but I have always been
                        interested in technology, which is why I decided not to
                        pursue the area of economics. I really like playing
                        football and playing computer games.
                    </p>
                    <div className='about-links'>
                        <Link to='https://github.com/Vini1602'>
                            <img
                                className='about-logo'
                                src={gitHubLogo}
                                alt='Github Page'
                            />
                        </Link>
                        <Link to='https://www.linkedin.com/in/victor-silva1602/'>
                            <img
                                className='about-logo'
                                src={linkedinLogo}
                                alt='Linkedin Logo'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
