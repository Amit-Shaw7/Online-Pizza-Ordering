import React, { useEffect } from 'react';
import Hero from './Hero';
import Menu from './Menu';
import "../../styles/home.scss";
import '../../styles/founder.scss';
import '../../styles/menu.scss';
import Highlight from '../../layout/Highlight';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  return (
    <>
      <Hero />
      <Highlight />
      <Menu />
    </>
  )
}

export default HomePage