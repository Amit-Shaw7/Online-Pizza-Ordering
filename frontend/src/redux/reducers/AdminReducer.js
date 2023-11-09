import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
    error: null,
    users: null,
    orders: null,
    income: null,
    preparing: null,
    shipped: null,
    delivered: null,
    allUserList: null,
    allOrdersList: null,
    allProductsList: null,
    currentProduct: null,
    refresh: true,
}

export const AdminReducer = createReducer(initialState, {
    // FETCHING STATS OF USER , ORDERS , INCOME
    FETCH_STATS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_STATS_SUCCESS: (state, action) => {
        state.error = null;
        state.loading = false;
        state.users = action.payload.userCount;
        state.orders = action.payload.ordersCount.totalOrders;
        state.income = action.payload.totalIncome;
        state.shipped = action.payload.ordersCount.shipped;
        state.preparing = action.payload.ordersCount.preparing;
        state.delivered = action.payload.ordersCount.delivered;
    },
    FETCH_STATS_FAILURE: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    // FETCHING ALL USERS LIST WHO ARE USING OUR SITE
    FETCH_ALL_USERS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_USERS_SUCCESS: (state, action) => {
        state.allUserList = action.payload;
        state.loading = false;
    },
    FETCH_ALL_USERS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // FETCHING ALL ORDERS MADE ON OUR SITE
    FETCH_ALL_ORDERS_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_ORDERS_SUCCESS: (state, action) => {
        state.allOrdersList = action.payload;
        state.loading = false;
    },
    FETCH_ALL_ORDERS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // FETCH ALL PRODUCTS
    FETCH_ALL_PRODUCT_REQUEST: (state) => {
        state.loading = true;
    },
    FETCH_ALL_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.allProductsList = action.payload.products;
    },
    FETCH_ALL_PRODUCT_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // ADDING A NEW PRODUCT
    ADD_NEW_PRODUCT_REQUEST: (state, action) => {
        state.loading = true;
    },
    ADD_NEW_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    ADD_NEW_PRODUCT_FAILURE: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },

    // UPDATE A PRODUCT
    UPDATE_PRODUCT_REQUEST: (state, action) => {
        state.loading = true;
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    UPDATE_PRODUCT_FAILURE: (state, action) => {
        state.error = action.payload;
        state.loading = false;
    },


    // DELETE A PRODUCT
    DELETE_PRODUCT_REQUEST: (state) => {
        state.loading = true;
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
        state.loading = false;
        state.refresh = !state.refresh;
    },
    DELETE_PRODUCT_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },


    // CHANGE ORDER STATUS
    CHANGE_ORDER_STATUS_REQUEST: (state, action) => {
        state.loading = true;
    },
    CHANGE_ORDER_STATUS_SUCCESS: (state, action) => {
        state.refresh = !state.refresh;
        state.loading = false;
    },
    CHANGE_ORDER_STATUS_FAILURE: (state, action) => {
        state.loading = false;
    },

    CLEAR_MSG: (state) => {
        state.message = null;
    },
    CLEAR_ERROR: (state) => {
        state.error = null;
    },
    LOADING_FALSE : (state) => {
        state.loading = false;
    }

});