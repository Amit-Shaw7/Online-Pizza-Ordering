import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    message: null,
    error: null,
    forms: [],
}

export const ContactReducer = createReducer(initialState, {
    FETCH_ALL_FORMS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_FORMS_SUCCESS: (state, action) => {
        state.loading = false;
        state.forms = action.payload;
    },
    FETCH_ALL_FORMS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    SUBMIT_FORM_REQUEST: (state) => {
        state.loading = true;
    },
    SUBMIT_FORM_SUCCESS: (state, action) => {
        state.forms = action.payload;
        state.loading = false;
        state.message = action.payload;
    },
    SUBMIT_FORM_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    CLEAR_MSG: (state) => {
        state.message = null;
    },
    CLEAR_ERROR: (state) => {
        state.error = null;
    },
});
