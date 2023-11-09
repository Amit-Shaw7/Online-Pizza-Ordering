import React, { useEffect, useRef } from 'react';
import "../styles/contact.scss";
import { motion } from 'framer-motion';
import Pizza from '../assets/veg-pizza.png';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../redux/actions/ContactActions';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const { loading, message: msg, error } = useSelector(state => state.contact)
  const name = useRef();
  const email = useRef();
  const message = useRef();
  const dispatch = useDispatch();
  const handleFormValidation = (e) => {
    e.preventDefault();
    dispatch(submitForm(email.current.value, name.current.value, message.current.value))
    email.current.value = "";
    name.current.value = "";
    message.current.value = "";
  }

  useEffect(() => {
    msg && toast.success(msg);
    dispatch({type:"CLEAR_MSG"});
  }, [msg]);
  
  useEffect(() => {
    error && toast.error(error);
    dispatch({type:"CLEAR_ERROR"});
  }, [error]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='contact'>
      <motion.form onSubmit={(e) => handleFormValidation(e)}>
        <h2>Contact Us</h2>
        <input ref={name} type="text" placeholder='Name' />
        <input ref={email} type="email" placeholder='Email' />
        <textarea ref={message} cols="30" rows="10" placeholder='Your Message ...'></textarea>
        <button type="submit">Submit</button>
      </motion.form>

      <motion.div className='curvedPart'>
        <motion.div transition={{ delay: "0.7" }} initial={{ y: "-100vh", x: "50%", opacity: "0" }} animate={{ y: "-50%", x: "50%", opacity: "1" }}>
          <img src={Pizza} alt="" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Contact