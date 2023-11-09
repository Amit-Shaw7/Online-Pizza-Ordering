import { server } from "../Store";
import axios from 'axios';
import { toast } from 'react-hot-toast';
axios.defaults.withCredentials = true;

export const fetchStats = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_STATS_REQUEST" });

        const url = `${server}/admin/stats`;
        const res = await axios.get(url, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "FETCH_STATS_SUCCESS", payload: res.data });
        } else {
            dispatch({ type: "FETCH_STATS_FAILURE", paylaod: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "FETCH_STATS_FAILURE", paylaod: error.response?.data?.msg });
    }
}

export const fetchAllUserList = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_ALL_USERS_REQUEST" });

        const url = `${server}/admin/users`;
        const res = await axios.get(url, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "FETCH_ALL_USERS_SUCCESS", payload: res.data.Users });
        } else {
            dispatch({ type: "FETCH_ALL_USERS_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "FETCH_ALL_USERS_FAILURE", payload: error.response.data.msg });
    }
}

export const fetchAllOrderList = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_ALL_ORDERS_REQUEST" });

        const url = `${server}/admin/allorders`;
        const res = await axios.get(url, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "FETCH_ALL_ORDERS_SUCCESS", payload: res.data.allOrders });
        } else {
            dispatch({ type: "FETCH_ALL_ORDERS_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "FETCH_ALL_ORDERS_FAILURE", payload: error.response.data.msg });
    }
}

export const changeOrderStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: "CHANGE_ORDER_STATUS_REQUEST" });
        const url = `${server}/admin/order/${id}`;
        const res = await axios.get(url, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "CHANGE_ORDER_STATUS_SUCCESS" });
            toast.success(res.data.msg);
        }
    } catch (error) {
        dispatch({ type: "CHANGE_ORDER_STATUS_FAILURE" });
        toast.error(error.response.data.msg)
    }

}

export const addNewProduct = (title, price, photoUrl) => async (dispatch) => {
    console.log("Running Add Request");
    if (!photoUrl) {
        toast.error("Please add Product image");
        return;
    }
    try {
        const url = `${server}/admin/product/add`;
        const res = await axios.post(url, { title, price, photoUrl }, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "ADD_NEW_PRODUCT_SUCCESS", payload: res.data.msg });
        } else {
            dispatch({ type: "ADD_NEW_PRODUCT_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "ADD_NEW_PRODUCT_FAILURE", payload: error.response.data.msg });
    }
}

export const updateProduct = (title, price, photoUrl, id) => async (dispatch) => {
    dispatch({ type: "UPDATE_PRODUCT_REQUEST" });
    console.log("Running Add Request");
    try {
        const url = `${server}/admin/product/update/${id}`;
        const res = await axios.put(url, { title, price, photoUrl }, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: res.data.msg });
        } else {
            dispatch({ type: "UPDATE_PRODUCT_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "UPDATE_PRODUCT_FAILURE", payload: error.response.data.msg });
    }
}

export const fetchAllProuctsList = () => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_ALL_PRODUCT_REQUEST" });

        const url = `${server}/admin/product/all`;
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
            dispatch({ type: "FETCH_ALL_PRODUCT_SUCCESS", payload: res.data });
        } else {
            dispatch({ type: "FETCH_ALL_PRODUCT_FAILURE", payload: res.data.msg });
        }

    } catch (error) {
        dispatch({ type: "FETCH_ALL_PRODUCT_FAILURE", payload: error.response.data.msg });
    }
}

export const fetchCurrentProduct = (id, from) => async (dispatch) => {
    try {
        dispatch({ type: "LOADING_TRUE" });

        const url = `${server}/admin/product/find/${id}`;
        const res = await axios.get(url, { withCredentials: true });
        if (res.status === 200) {
            if (from !== "cart") {
                dispatch({ type: "LOADING_FALSE", payload: res.data.product });
            }
            return res.data.product;
        } else {
            if (from !== "cart") {
                dispatch({ type: "LOADING_FALSE" });
            }
            dispatch({ type: "SET_ERROR", payload: res.data.msg });
        }

    } catch (error) {
        if (from !== "cart") {
            dispatch({ type: "LOADING_FALSE" });
        }
        dispatch({ type: "SET_ERROR", payload: error.response.data.msg });
    }
}

export const deleteAProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: "DELETE_PRODUCT_REQUEST" });
        const url = `${server}/admin/product/delete/${id}`;
        const res = await axios.delete(url, { withCredentials: true });
        if (res.status === 200) {
            dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data.msg });
            toast.success("Product Deleted Successfully");
        } else {
            dispatch({ type: "DELETE_PRODUCT_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "DELETE_PRODUCT_FAILURE", paylaod: error.response.data.msg });
    }
}
