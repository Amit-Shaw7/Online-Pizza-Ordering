import { server } from '../Store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export const submitForm = (email, name, message) => async (dispatch) => {
    try {
        dispatch({ type: "SUBMIT_FORM_REQUEST" });

        const url = `${server}/contacts//submit`;
        const res = await axios.post(url, { email, name, message }, { withCredentials: true });

        if (res.status === 200) {
            dispatch({ type: "SUBMIT_FORM_SUCCESS", payload: res.data.msg });
        } else {
            dispatch({ type: "SUBMIT_FORM_FAILURE", payload: res.data.msg })
        }
    } catch (error) {
        dispatch({ type: "SUBMIT_FORM_FAILURE", payload: error.response.data.msg })
    }
}