import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../Store';
axios.defaults.withCredentials = true;

export const createCODOrder = (dataToSend) => async (dispatch) => {
    try {
        dispatch({ type: "ORDER_PLACED_REQUEST" });
        // console.log("Running : ", dataToSend)
        const url = `${server}/orders/createorder`;
        const res = await axios.post(url, dataToSend, {
            withCredentials: true
        });
        if (res.status === 200) {
            // toast.success("Order Created Succesfully");
            dispatch({ type: "CLEAR_TOAST_MSG" });
            dispatch({ type: "RESET_CART_ITEM_COUNT" });
            dispatch({ type: "CALCULATE_PRICE" });
            dispatch({ type: "ORDER_PLACED_SUCCESS", payload: res.data.msg });
        } else {
            dispatch({ type: "ORDER_PLACED_FAILURE" });
        }

    } catch (error) {
        toast.error(error.message);
    }
}

export const createOnlineOrder = (dataToSend) => async (dispatch) => {
    try {
        // console.log("Running : ", dataToSend)
        const url = `${server}/orders/createonlineorder`;
        const res = await axios.post(url, dataToSend, {
            withCredentials: true
        });

        var options = {
            key: "rzp_test_btDBEEfDfCDbli", // Enter the Key ID generated from the Dashboard
            amount: dataToSend.totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Pijja",
            description: "We provide the best taste a pizza can have",
            order_id: res.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                dispatch(verifyPayment(
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    options,
                    dataToSend
                ));

            },
            theme: {
                color: "#fc8019"
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

    } catch (error) {
        toast.error(error.message);
    }
}

export const verifyPayment = (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions, dataRecieved) => async (dispatch) => {
    try {
        dispatch({ type: "ORDER_PLACED_REQUEST", });


        const res = await axios.post(`${server}/orders/paymentverification`,
            { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions, dataRecieved },
            { withCredentials: true }
        );

        if (res.status === 200) {
            dispatch({ type: "PAYMENT_VERIFICATION_SUCCESS" });
            dispatch({ type: "ORDER_PLACED_SUCCESS", payload: res.data.msg });
            dispatch({ type: "RESET_CART_ITEM_COUNT" });
            dispatch({ type: "CALCULATE_PRICE" });

        } else {
            dispatch({ type: "PAYMENT_VERIFICATION_FAILED" });
            dispatch({ type: "ORDER_PLACED_FAILURE", payload: res.data.msg });
            toast.error("Payment Failed");
        }


    } catch (error) {
        dispatch({ type: "PAYMENT_VERIFICATION_FAILED", payload: error.response.data.msg });
    }
}





















// export const createOrder = (shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount) => async (dispatch) => {
//     try {
//         dispatch({
//             type: "orderRequest",
//         });
//         console.log("Running")
//         const res = await axios.post(`${server}/orders/createorder`,
//             {
//                 shippingInfo,
//                 orderItems,
//                 paymentMethod,
//                 itemsPrice,
//                 taxPrice,
//                 shippingCharges,
//                 totalAmount,
//             },
//             {
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//                 withCredentials: true
//             }
//         );

//         if (res.status === 200) {
//             toast.success("Order Created Succesfully");
//             console.log(res.data)
//         } else {
//             toast.error("Something went wrong");
//         }


//     } catch (error) {
//         dispatch({
//             type: "orderFailure",
//             payload: error.message
//         });
//     }
// }

