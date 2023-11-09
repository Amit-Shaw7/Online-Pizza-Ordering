import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../Store';
import { getCartItemCount } from './CartAction';
axios.defaults.withCredentials = true;


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOAD_USER_REQUEST", });

        console.log("Running")
        const { data } = await axios.get(`${server}/auths/isloggedin`, {
            withCredentials: true
        });

        if (data.user) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: data?.user });
            toast.success("Logged In");
        } else {
            dispatch({ type: "LOAD_USER_FAILURE", payload: data.msg, });
            toast.error("Not Logged In");
        }
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAILURE", payload: error.response.data.msg });
        toast.error("Not Logged In");
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQUEST", });

        const res = await axios.get(`${server}/auths/logout`, {
            withCredentials: true
        });
        if (res.status === 200) {
            dispatch({ type: "LOGOUT_SUCCESS", payload: res.data.msg });
        } else {
            dispatch({ type: "LOGOUT_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "LOGOUT_FAILURE", payload: error.response.data.msg });
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });

        const url = `${server}/auths/login`;
        const res = await axios.post(url, { email, password }, {
            withCredentials: true
        });

        if (res.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            toast.success(res.data.msg);
            dispatch(getCartItemCount());
        } else {
            dispatch({ type: "LOGIN_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.msg });
    }
}

export const signupFn = (email, password, phone, name) => async (dispatch) => {
    dispatch({ type: "SIGNUP_REQUEST" });
    try {
        const url = `${server}/auths/signup`;
        const res = await axios.post(url, { email, password, name, phone }, {
            withCredentials: true
        });

        if (res.status === 200) {
            dispatch({ type: "SIGNUP_SUCCESS", payload: res.data.msg });
            toast.success(res.data.msg);
        } else {
            dispatch({ type: "SIGNUP_FAILURE", payload: res.data.msg });
            toast.error(res.data.msg);
        }
    } catch (error) {
        dispatch({ type: "SIGNUP_FAILURE", payload: error.response.data.msg });
        toast.error(error.response.data.msg);
    }
}

export const updateUserDetails = (email, phone, name, address, pincode , image) => async (dispatch) => {
    dispatch({ type: "UPDATE_USER_REQUEST" });
    try {
        const photoURL = image ? image : false;
        const url = `${server}/users/me`;
        const res = await axios.put(url, { email, phone, name, photoURL , address , pincode}, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "UPDATE_USER_SUCCESS", payload: res.data });
        } else {
            dispatch({ type: "UPDATE_USER_FAILURE", payload: res.data.msg });
        }
    } catch (error) {
        dispatch({ type: "UPDATE_USER_FAILURE", payload: error.response.data.msg });
    }
}

export const uploadImage = (image, type) => async (dispatch) => {
    try {
        if (!image) {
            return true;
        } else if (image.size > 105000) {
            toast.error("Image size must be less than 100kb");
            return;
        }

        if (type === "user") {
            dispatch({ type: "UPDATE_USER_REQUEST" });
        } else if (type === "update") {
            dispatch({ type: "UPDATE_PRODUCT_REQUEST" })
        } else {
            dispatch({ type: "ADD_NEW_PRODUCT_REQUEST" });
        }
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "pijjaApp");
        data.append("cloud_name", "amitkumarshaw");

        const url = 'https://api.cloudinary.com/v1_1/amitkumarshaw/image/upload';
        const res = await fetch(url, {
            method: "POST",
            body: data
        });
        const json = await res.json();
        if (res.status === 200) {
            return json;
        } else {
            dispatch({ type: "LOADING_FALSE" });
            toast.error("Can't upload image please try again later");
        }
        // console.log(json);
    } catch (error) {
        dispatch({ type: "LOADING_FALSE" });
        toast.error("Can't upload image please try again later")
    }
}

export const forgetPasswordFn = (email) => async (dispatch) => {
    try {
        dispatch({ type: "LOADING_TRUE" });
        const url = `${server}/auths/forgetpassword`;
        const res = await axios.post(url, {email}, { withCredentials: true });
        if (res.status === 200) {
            dispatch({ type: "LOADING_FALSE" });
            toast.success("Mail with reset password link is sent to your email account");
        } else {
            dispatch({ type: "LOADING_FALSE" });
            toast.error(res.data.msg);
        }
    } catch (error) {
        dispatch({ type: "LOADING_FALSE" });
        toast.error(error.response.data.msg);
    }
}
export const resetPasswordFn = (token , password , confirmPassword) => async (dispatch) => {
    try {
        dispatch({ type: "LOADING_TRUE" });
        const url = `${server}/auths/resetpassword/${token}`;
        const res = await axios.post(url, {password , confirmPassword}, { withCredentials: true });
        if (res.status === 200) {
            dispatch({ type: "LOADING_FALSE" });
            toast.success(res.data.msg);
        } else {
            dispatch({ type: "LOADING_FALSE" });
            toast.error(res.data.msg);
        }
    } catch (error) {
        dispatch({ type: "LOADING_FALSE" });
        toast.error(error.response.data.msg);
    }
}

