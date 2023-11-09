import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/payment.scss";

const OrerConfirmedPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="payment">
            <main>
                <h1>Order Confirmed</h1>
                <p>Order Placed Succesfully , You can check order status</p>
                <Link to="/myorders">Check Status</Link>
            </main>
        </section>
    )
}

export default OrerConfirmedPage