import React from 'react';
import "../styles/notFound.scss";
import { MdError } from "react-icons/md"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="not-found">
            <main>
                <div>
                    <MdError />

                    <h1>404</h1>
                </div>
                <p>Page Not Found</p>

                <p>Click bellow to got to Homepage</p>
                <Link to="/">Go to Home</Link>
            </main>
        </section>
    )
}

export default NotFound