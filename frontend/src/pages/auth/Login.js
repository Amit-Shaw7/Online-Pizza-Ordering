import React, { useEffect } from 'react';
import "../../styles/login.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from "react-hot-toast";
import { forgetPasswordFn, login, resetPasswordFn, signupFn } from '../../redux/actions/UserAction';
import Loader from '../../layout/Loader';

const Login = ({ type }) => {
  const { msg, error, navigateToHome, navigateToLogin, loading } = useSelector(state => state.auth);

  const email = useRef();
  const password = useRef();
  const name = useRef();
  const phone = useRef();
  const cPassword = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const token = params.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (type) {
      case "login":
        dispatch(login(email.current.value, password.current.value));
        break;
      case "signup":
        dispatch(signupFn(email.current.value, password.current.value, phone.current.value, name.current.value));
        break;
      case "forget":
        dispatch(forgetPasswordFn(email.current.value));
        break;
      case "reset":
        dispatch(resetPasswordFn(token, password.current.value, cPassword.current.value));
        break;

      default:
        break;
    }
  }

  const guestLogin = () => {
    const email = "guest@gmail.com";
    const password = "123456";
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (msg) {
      console.log(msg);
      navigateToHome && navigate('/');
      navigateToLogin && navigate('/login');
      dispatch({ type: "CLEAR_MSG" });
    }
    // eslint-disable-next-line
  }, [msg, dispatch]);

  useEffect(() => {
    error && toast.error(error);
    dispatch({ type: "CLEAR_ERROR" });
  }, [error, dispatch]);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  return (
    <section className='login'>
      {
        loading
          ?
          <Loader />
          :

          <form onSubmit={(e) => handleSubmit(e)}>
            <h2>{((type === "signup" && "Singup") || (type === "login" && "Login") || (type === "forget" && "Forget Password") || (type === "reset" && "Reset Password"))}</h2>

            {type !== "reset" && <input required ref={email} type="email" placeholder='Enter Your Email' />}
            {type !== "forget" && <input minLength={6} required ref={password} type="password" placeholder='Enter Your Password' />}
            {type === "reset" && <input required minLength={6} ref={cPassword} type="password" placeholder='Confirm Password' />}

            {
              type === "signup" &&
              <>
                <input required minLength={3} ref={name} type="text" placeholder='Enter Your Name' />
                <input required minLength={10} ref={phone} type="number" placeholder='Enter Your Phone No.' />
              </>
            }
            <button type="submit">{((type === "signup" && "Singup") || (type === "login" && "Login") || (type === "forget" && "Submit") || (type === "reset" && "Reset"))}</button>
            {
              type === "login" && <button onClick={guestLogin} type="button">Login as guest</button>
            }

            {((type !== "forget") && (type !== "reset")) && <h2>OR</h2>}
            {type === "signup" && <Link to='/login'>Login</Link>}
            {type === "login" && <Link to='/signup'>Signup</Link>}
            {type === "login" && <p><Link to='/forgetpassword'>Forget password</Link></p>}

          </form>
      }
      <Toaster />
    </section>
  )
}

export default Login