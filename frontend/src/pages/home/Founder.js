import React from 'react';
import { motion } from 'framer-motion';
import me from "../../assets/me.jpg";

const Founder = () => {
  const options = {
    initial:{
      x:"-100%",
      opacity:0
    },
    whileInView:{
      x:"0%",
      opacity:1
    }
  }
  return (
    <section className='founder'>
      <motion.div {...options}>
        <img src={me} alt="Founder Of Pizzz" height={250} width={250} />
        <h3>Amit Kumar Shaw</h3>
        <p>
          Hey , I am the founder of Pijja .
          We might not deliver your pizza in 30 minutes but your pizza will worth your wait 😀.<br/>
          Try it once and i am sure you're gonna love it .<br/>
          😋
        </p>
      </motion.div>
    </section>
  )
}

export default Founder