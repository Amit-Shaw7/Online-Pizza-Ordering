import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/editProfile.scss';
import noAvatar from '../../assets/noavatar.png'
import { AiFillCamera } from 'react-icons/ai';
import { updateUserDetails, uploadImage } from '../../redux/actions/UserAction';
import Loader from '../../layout/Loader';
import toast from 'react-hot-toast';


const EditProfile = () => {
    const { user, msg, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const type = "user";
    const [loading, setLoading] = useState(false);

    const [imageToSend, setImageToSend] = useState(null);
    const [image, setImage] = useState(null);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone);
    const [address, setAddress] = useState(user.address.desc ? user.address.desc : "");
    const [pincode, setPincode] = useState(user.address.pincode ? user.address.pincode : "");

    const updateDetails = async (e) => {
        setLoading(true);
        e.preventDefault();
        const data = await dispatch(uploadImage(imageToSend, type));
        console.log(data);
        if (data) {
            dispatch(updateUserDetails(email, phone, name, address, pincode, data.url));
        }
        setLoading(false);
    }

    const setImageForpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageToSend(e.target.files[0]);
        // console.log(e.target.files[0])
    }

    useEffect(() => {
        msg && toast.success(msg);
        dispatch({ type: "CLEAR_MSG" });
    }, [msg, dispatch]);


    useEffect(() => {
        error && toast.success(error);
        dispatch({ type: "CLEAR_ERROR" });
    }, [error, dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className="edit-profile">
            {

                loading
                    ?
                    <Loader />
                    :
                    <main>
                        <form onSubmit={updateDetails}>
                            <div>
                                <img src={image ? image : user?.photo ? user?.photo : noAvatar} alt="" />
                                <label className='upload' htmlFor="photo"><AiFillCamera /></label>
                                <input autoComplete="true" onChange={(e) => setImageForpload(e)} style={{ display: "none" }} type="file" id='photo' name="photo" />
                            </div>
                            <div>
                                <label htmlFor="">Name : </label>
                                <input autoComplete="true" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div>
                                <label htmlFor="">Email : </label>
                                <input autoComplete="true" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div>
                                <label htmlFor="">Phone : </label>
                                <input autoComplete="true" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />
                            </div>
                            <div>
                                <label htmlFor="">Address : </label>
                                <input autoComplete="true" type="text" onChange={(e) => setAddress(e.target.value)} value={address} />
                            </div>
                            <div>
                                <label htmlFor="">Pincode : </label>
                                <input minLength={6} autoComplete="true" type="text" onChange={(e) => setPincode(e.target.value)} value={pincode} />
                            </div>
                            <button type='Submit'>Confirm</button>
                        </form>
                    </main>
            }
        </section>
    )
}

export default EditProfile