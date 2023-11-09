import React from 'react';
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai';
import '../styles/footer.scss';

const Footer = () => {
    return (
        <footer>
            <div>
                <h2>Pijja - Provides the best taste a pizza can have</h2>
                <p>We might not deliver your pizza in 30 minutes . But your pizza will worth your wait.</p>
                <br />
                <p>We would love to hear your feedback with smile . And try to implement quickly if possible. </p>
                <br />
                <p><strong>All rights reserved @pijja</strong></p>
            </div>
            <aside>
                <h4>Follow Us </h4>
                <br />
                <a href="/"><AiFillInstagram /></a>
                <a href="/"><AiFillYoutube /></a>
                <a href="/"><AiFillTwitterCircle /></a>
            </aside>
        </footer>
    )
}

export default Footer