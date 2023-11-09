import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../../styles/confirmOrder.scss";
import toast from 'react-hot-toast';
import { createCODOrder, createOnlineOrder } from '../../redux/actions/OrderActions';
import Loader from '../../layout/Loader';
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { shippingInfo, cartItems, subTotal, tax, shippingCharges, total, loading, error, message } = useSelector(state => state.cart);
    // console.log("From store : ", shippingCharges, cartItems, subTotal, tax, shippingInfo, total)

    const [paymentMode, setPaymentMode] = useState("");
    const [disableBtn, setDisableBtn] = useState(false);

    const dataToSend = {
        shippingInfo: {
            address: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            pincode: shippingInfo.pincode,
            phoneNo: shippingInfo.phoneNo
        },
        orderItems: cartItems,
        paymentMethod: paymentMode,
        itemsPrice: subTotal,
        taxPrice: tax,
        shippingCharges: shippingCharges,
        totalAmount: total,
    }



    useEffect(() => {
        if (message) {
            toast.success(message);
            navigate("/confirm");
            dispatch({ type: "CLEAR_TOAST_MSG" });
        }
        // eslint-disable-next-line
    }, [message, navigate]);

    useEffect(() => {
        error && toast.error(error);
        error && dispatch({ type: "CLEAR_TOAST_MSG" });
        // eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisableBtn(true);

        if (paymentMode === "COD") {
            dispatch(createCODOrder(dataToSend));
        } else {
            dispatch(createOnlineOrder(dataToSend));
        }
    }

    return (
        <section className="confirm-order">
            {
                loading
                    ?
                    <Loader />
                    :
                    <main>
                        <h1>Confirm Order</h1>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="">Cash On Delivery</label>
                                {/* input radio ka name same hoga to hi dono me se ek hi choose kar payenge */}
                                <input onChange={() => setPaymentMode("COD")} type="radio" name="payment" />
                            </div>
                            <div>
                                <label htmlFor="">Online</label>
                                {/* input radio ka name same hoga to hi dono me se ek hi choose kar payenge */}
                                <input onChange={() => setPaymentMode("ONLINE")} type="radio" name="payment" />
                            </div>

                            <button disabled={disableBtn} type="submit">Place Order</button>
                        </form>
                    </main>
            }

        </section>
    )
}

export default PaymentPage