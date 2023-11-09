import React from 'react';
import { motion } from 'framer-motion';
const options  = {
  initial:{
    x:"-100%" ,
    opacity:0
  },
  whileInView:{
    x:"0%" ,
    opacity:1
  }
}

const Hero = () => {
  return (
    <section className='home'>
        <div>
          <motion.h1 {...options}>Have your own <br/><span>pizza</span></motion.h1>
          <motion.p {...options} transition={{delay:"0.2"}}>Might not in 30 minutes but will worth your wait .</motion.p>
        </div>
        <motion.a initial={{y:"-100%",opacity:0}} whileInView={{y:"0",opacity:1}} transition={{delay:"0.2"}} href="#menu">Explore</motion.a>
    </section>
  )
}

export default Hero