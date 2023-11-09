import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    message: null,
    error: null,
    cartItems: [],
    subTotal: 0,
    refresh: false,
    tax: 0,
    shippingCharges: 0,
    total: 0,
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        phoneNo: null,
        pincode: null,
    },
    cartItemsCount: 0
}

export const CartReducer = createReducer(initialState, {
    INCREMENT_CART_iTEM_COUNT: (state) => {
        // INCREMENT CART ITEM COUNT WHEN ITEM IS ADDED TO THE CART
        state.cartItemsCount += 1;
    },

    GET_CART_ITEM_COUNT: (state, action) => {
        // GETS LENGTH OF THE CART TO DISPLAY ON NAVBAR CART ICON
        state.cartItemsCount = action.payload;
    },

    INCREMENT_QTY: (state, action) => {
        for (let i = 0; i < state.cartItems?.length; i++) {
            if (state.cartItems[i].productId === action.payload) {
                // console.log(state.cartItems[i].productId);
                state.cartItems[i].qty += 1;
            }
        }
    },

    DECREMENT_QTY: (state, action) => {
        for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i].productId === action.payload) {
                state.cartItems[i].qty -= 1;
            }
        }
    },

    RESET_CART_ITEM_COUNT: (state) => {
        // RESETS CART ITEM COUNT TO 0 ON NAVBAR CART ICON WHEN LOGGED OUT 
        state.cartItemsCount = 0;
    },

    SET_CART_ITEMS: (state, action) => {
        // console.log("Setting cart Items : " , action.payload);
        state.cartItems = action.payload;
    },

    RESET_PRICE: (state) => {
        state.subTotal = 0;
        state.tax = 0;
        state.shippingCharges = 0;
        state.total = 0;
    },

    CALCULATE_PRICE: (state) => {
        if (state.cartItems.length > 0) {
            for (let i = 0; i < state.cartItems.length; i++) {
                state.subTotal += state.cartItems[i].price * state.cartItems[i].qty;
            }
            state.tax = state.subTotal * 0.18;
            // console.log("subtotal : ", state.subTotal, "tax : ", state.tax)
            state.shippingCharges = state.subTotal + state.tax > 499 ? 0 : 199;
            state.total = state.tax + state.subTotal + state.shippingCharges;
        }
    },

    SET_SHIPPING_INFO: (state, action) => {
        // console.log(action)
        state.shippingInfo.address = action.payload.address;
        state.shippingInfo.city = action.payload.city;
        state.shippingInfo.state = action.payload.state;
        state.shippingInfo.pincode = action.payload.pincode;
        state.shippingInfo.phoneNo = action.payload.phoneNo;
    },
    CLEAR_TOAST_MSG: (state) => {
        state.error = null;
        state.message = null;
    },

    REMOVE_FROM_CART_REQUEST: (state) => {
        state.loading = true;
    },
    REMOVE_FROM_CART_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.cartItemsCount -= 1;
        state.refresh = !state.refresh;
    },
    REMOVE_FROM_CART_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },


    //FUNCTIONS FOR PLACING ORDER -----------------------------------------------------

    ORDER_PLACED_REQUEST: (state) => {
        state.loading = true;
    },
    ORDER_PLACED_SUCCESS: (state, action) => {
        state.loading = false;
        state.message = action.payload;
        console.log("For Reducer : ", action.payload);
        state.cartItems = [];
        state.shippingInfo = {};
    },
    ORDER_PLACED_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },



    //FUNCTIONS FOR VERIFYING PAYMENTS -----------------------------------------------------

    PAYMENT_VERIFICATION_REQUEST: (state) => {
        state.loading = true;
    },
    PAYMENT_VERIFICATION_FAILED: (state, action) => {
        state.loading = false;
    },
    PAYMENT_VERIFICATION_SUCCESS: (state, action) => {
        state.loading = false;
    },
});



