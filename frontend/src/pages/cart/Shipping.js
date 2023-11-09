import React, { useEffect, useState } from 'react';
import "../../styles/shipping.scss";
import { State, City } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [curState, setCurState] = useState("");
    const [curCity, setCurCity] = useState("");
    const [address, setAddress] = useState(user?.address?.desc);
    const [phone, setPhone] = useState(user?.phone);
    const [pincode, setPincode] = useState(user?.address?.pincode);

    const handleState = (value) => {
        setCurState(value);
        console.log(value);
    }
    const handleCity = (value) => {
        setCurCity(value);
        console.log(value);
    }
    const handleConfirmOrder = (e) => {
        e.preventDefault();
        const shippingDetails = {
            address,
            city: curCity,
            state: curState,
            pincode,
            phoneNo: phone,
        };
        dispatch({
            type: "SET_SHIPPING_INFO",
            payload: shippingDetails
        });
        navigate("/payment");
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className='shipping'>
            <main>
                <h1>Shipping Details</h1>
                <form onSubmit={handleConfirmOrder}>
                    <div>
                        <label htmlFor="">Address</label>
                        <input required={true} value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder='Enter Address' />
                    </div>


                    <div>
                        <label htmlFor="">State</label>
                        <select onChange={(e) => handleState(e.target.value)}>
                            <option required={true} >State</option>
                            {
                                State && State.getStatesOfCountry("IN").map((eachState, idx) => (
                                    <option key={idx} value={eachState.isoCode} >{eachState.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="">City</label>
                        <select onChange={(e) => handleCity(e.target.value)}>
                            <option required={true} >City</option>
                            {
                                City && City.getCitiesOfState("IN", curState).map((city, idx) => (
                                    <option key={idx} value={city.isoCode} >{city.name}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div>
                        <label htmlFor="">pincode</label>
                        <input minLength={6} required={true} value={pincode} onChange={(e) => setPincode(e.target.value)} type="number" placeholder='Enter pincode' />
                    </div>

                    <div>
                        <label htmlFor="">Phone</label>
                        <input required={true} minLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder='Enter your phone number' />
                    </div>

                    <button type='submit'>Confirm Order</button>
                </form>
            </main>
        </section>
    )
}

export default Shipping