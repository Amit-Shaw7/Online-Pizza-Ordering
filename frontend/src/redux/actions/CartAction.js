import axios from 'axios';
import { server } from '../Store';
axios.defaults.withCredentials = true;


export const getCartItemCount = () => async (dispatch) => {
    try {
        const res = await axios.get(`${server}/carts/totalitems`, { withCredentials: true });
        if (res.status === 200) {
            dispatch({
                type: "GET_CART_ITEM_COUNT",
                payload: res.data?.totalItems
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const resetCartItemCount = () => async (dispatch) => {
    dispatch({
        type: "RESET_CART_ITEM_COUNT",
    })
}

export const fetchCartItems = () => async (dispatch) => {
    const url = `${server}/carts/items`;
    const res = await axios.get(url, { withCredentials: true });
    if (res.status === 200) {
        dispatch({ type: "SET_CART_ITEMS", payload: res.data.items });
        dispatch({ type: "RESET_PRICE" });
        dispatch({ type: "CALCULATE_PRICE" });
    }
}

export const deleteAItem = (productId) => async (dispatch) => {
    try {
        dispatch({ type: "REMOVE_FROM_CART_REQUEST" });

        const url = `${server}/carts/removefromcart`;
        const res = await axios.patch(url, { productId }, { withCredentials: true });
        if (res.status === 200) {
            dispatch({ type: "REMOVE_FROM_CART_SUCCESS", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "REMOVE_FROM_CART_FAILURE", payload: error.response.data.msg });
    }
}