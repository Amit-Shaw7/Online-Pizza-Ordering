import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    msg : null ,
    error : null
}

export const GeneralReducer = createReducer(initialState, {
    LOADING_TRUE : (state) => {
        state.loading = true;
    },
    LOADING_FALSE : (state) => {
        state.loading = false
    },

    SET_MSG : (state , action) => {
        state.msg = action.payload;
    },
    SET_ERROR : (state , action) => {
        state.error = action.payload;
    }
})