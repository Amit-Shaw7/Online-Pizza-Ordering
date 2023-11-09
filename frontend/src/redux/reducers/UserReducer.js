import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    msg: null,
    navigateToHome: false,
    navigateToLogin: false,
}

export const AuthReducer = createReducer(initialState, {

    // FOR CHECKING GUSER LOGGED OR NOT ---------------------

    LOAD_USER_REQUEST: (state) => {
        state.loading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    LOAD_USER_FAILURE: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    },



    // FOR USER LOGOUT -------------------

    LOGOUT_REQUEST: (state) => {
        state.loading = true;
    },
    LOGOUT_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        state.msg = action.payload;
        state.isAuthenticated = false;
    },
    LOGOUT_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // FOR USER LOGIN --------------------

    LOGIN_REQUEST: (state) => {
        state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.navigateToHome = true;
        state.isAuthenticated = true;
    },
    LOGIN_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // FOR USER SIGNUP ---------------------

    SIGNUP_REQUEST: (state) => {
        state.loading = true;
    },
    SIGNUP_SUCCESS: (state, action) => {
        state.loading = false;
        state.msg = action.payload;
        state.navigateToLogin = true;
    },
    SIGNUP_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // UPDATE_USER_DETAILS

    UPDATE_USER_REQUEST: (state) => {
        state.loading = true;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
        state.loading = false;
        state.msg = action.payload.msg;
        state.user = action.payload.user;
    },
    UPDATE_USER_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // RESETING TOAST MSG -------------------

    CLEAR_ERROR: (state, action) => {
        state.error = null;
    },
    CLEAR_MSG: (state, action) => {
        state.msg = null;
    },

    // TOGGELING LOADING
    LOADING_TRUE: (state) => {
        state.loading = true;
    },
    LOADING_FALSE: (state) => {
        state.loading = false;

    },

});