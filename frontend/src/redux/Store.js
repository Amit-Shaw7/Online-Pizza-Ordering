import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducers/UserReducer";
import { CartReducer } from "./reducers/CartReducer";
import { AdminReducer } from "./reducers/AdminReducer";
import { ContactReducer } from "./reducers/ContactReducer";
import { GeneralReducer } from "./reducers/GeneralReducer";
const Store = configureStore({
    reducer:{
        cart : CartReducer,
        auth : AuthReducer,
        admin : AdminReducer,
        contact : ContactReducer,
        general : GeneralReducer
    }
});


export default Store;

// export const server = "https://pijja-api.onrender.com/api";
export const server = "http://localhost:5000/api";