import React from "react";
import { Link } from "react-router-dom";
import gitHubLogo from "./assets/GitHub-Logo.png";
import Carina from "./assets/Carina.jpg";
import Miguel from "./assets/Miguel.jpg";
import Josip from "./assets/Josip.jpg";
import victor from "./assets/Victor.jpg";
import linkedinLogo from "./assets/linkedin.jpg";

function AboutUs() {
  return (
    <div className="aboutUsDiv">
      <h1 classname="aboutUsH">About Us</h1>
      <div className="vasco">
        <h3>Vasco Godinho</h3>
        <img src={vasco} alt="Vasco's Picture"></img>
        <p>
          Hi! I'mand I'm 28 years old and I was borned and raised
          in Portugal. During my academics in Sound Design, I've always been
          interested in programming, working on some visual and sound projects.
          My main hobbies are listening to music and playing video games.
        </p>

        <div>
          <Link to="https://github.com/VascoGodinho" className="gitHub">
            <img src={gitHubLogo} alt="Github Page"></img>
          </Link>
          <Link
            to="https://www.linkedin.com/in/vasco-godinho-2719ba168/"
            className="Linkedin"
          >
            <img src={linkedinLogo} alt="Linkedin Logo"></img>
          </Link>
        </div>
      </div>
      <div className="victor">
        <h3>Victor Silva</h3>
        <img src={victor} alt="Victor's Image"></img>
        <p>My name is Victor Silva, I am 24 years old.</p>
        <p>
          I was born in Brazil but came to Portugal when I was five years old,
          since then I have lived in Lisbon. I have a background in Management,
          but I have always been interested in technology, which is why I
          decided not to pursue the area of economics. I really like playing
          football and playing computer games.
        </p>
        <Link to="https://github.com/Vini1602" className="gitHub">
          <img src={gitHubLogo} alt="Github Page"></img>
        </Link>
        <Link
          to="https://www.linkedin.com/in/victor-silva-17a53b196"
          className="Linkedin"
        >
          <img src={linkedinLogo} alt="Linkedin Logo"></img>
        </Link>
      </div>

      <div className="Carina">
        <h3>Carina França</h3>
        <img src={Carina} alt="Carina's Picture"></img>
        <p>
          Hi! I'm Vasco Godinho and I'm 28 years old and I was borned and raised
          in Portugal. During my academics in Sound Design, I've always been
          interested in programming, working on some visual and sound projects.
          My main hobbies are listening to music and playing video games.
        </p>

        <div>
          <Link to="https://github.com/ksfraan" className="gitHub">
            <img src={gitHubLogo} alt="Github Page"></img>
          </Link>
          <Link
            to="https://www.linkedin.com/in/vasco-godinho-2719ba168/"
            className="Linkedin"
          >
            <img src={linkedinLogo} alt="Linkedin Logo"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;