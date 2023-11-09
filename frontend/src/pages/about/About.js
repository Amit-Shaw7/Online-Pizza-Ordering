import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/about.scss";
import { RiFindReplaceLine } from "react-icons/ri";
import me from "../../assets/me.jpg";
import Highlight from '../../layout/Highlight';

const About = ({ detailed }) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <section className="about">
      <main style={{ maxWidth: `${detailed ? "900px" : "100vw"}` }}>
        {detailed && <h1>About Us</h1>}
        {detailed && <article>
          <h4>Pijja</h4>
          <p>We might not deliver your pizza in 30 minutes <br />but the your pizza will worth your wait</p>
          <p>Explore the various types of pizza's . Click below to see menu</p>
          <Link to="/"><RiFindReplaceLine /></Link>

        </article>}
        <Highlight />
      </main>
    </section>)
}

export default About