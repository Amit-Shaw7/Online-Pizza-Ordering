import React from 'react';
import { IoPizza } from "react-icons/io5";
import '../styles/loader.scss';
const Loader = () => {
    const options = {
        intitial: {
            scale: 1,
        },
        animate: {
            scale: 2,
        },
        transition: {
            duration: 0.5,
            ease: "linear",
            repeat: "Infinity",
            reapeatType: "reverse",
            restSpeed: "1s"
            // transitionTimingFunction: "ease-in-out"
        }
    }
    return (
        <div className='loader'>
            <div className='zoom-in-out-box'>
                <IoPizza color='#fc8019' />
            </div>
            <h4 style={{ color: "#fc8019" }}>Loading...</h4>
        </div>
    )
}

export default Loader