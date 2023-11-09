import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import noAvatar from '../../assets/noavatar.png'
import { Link } from 'react-router-dom';
import "../../styles/profile.scss";
import { MdDashboard } from "react-icons/md";
import { IoBag } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/UserAction';
import { resetCartItemCount } from '../../redux/actions/CartAction';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const options = {
        initial: {
            y: "-100%",
            opacity: 0,
        },

        animate: {
            y: 0,
            opacity: 1
        }
    };

    const handleLogout = async () => {
        dispatch(logoutUser());
        dispatch(resetCartItemCount());
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="profile">
            {
                <main>
                    {
                        user?.role === "admin" && <motion.div {...options} transition={{ delay: 0.5 }}>
                            <Link style={{
                                backgroundColor: "rgb(40,40,40)",
                                borderRadius: "5px",
                                display: "flex",
                                // alignItems:"center"
                            }
                            } to="/admin/dashboard">
                                <MdDashboard style={{ marginRight: "0.5rem" }} /> Dashboard
                            </Link>
                        </motion.div>
                    }
                    <motion.img {...options} src={user?.photo ? user?.photo : noAvatar} alt="User" />

                    <motion.h5 {...options} transition={{ delay: 0.3 }} >{user?.name.split(" ")[0]}</motion.h5>

                    <motion.div initial={{ x: "-100vw", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        <Link style={{ display: "flex" }} to="/myorders">
                            <IoBag style={{ marginRight: "0.5rem" }} /> My Orders
                        </Link>
                    </motion.div>

                    <motion.div initial={{ x: "-100vw", opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        <Link style={{ display: "flex" }} to="/updateprofile">
                            <FaEdit style={{ marginRight: "0.5rem" }} /> Edit Profile
                        </Link>
                    </motion.div>

                    <motion.button onClick={handleLogout} style={{ display: "flex" }} initial={{ x: "-100vw", opacity: 0 }} animate={{ x: 0, opacity: 1 }}><FiLogOut style={{ marginRight: "0.5rem" }} /> Logout</motion.button>
                </main>

            }
        </section>
    )
}

export default Profile