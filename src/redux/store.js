import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "./slices/ListSlice";

const store = configureStore({
    reducer: {
        list: ListSlice,
    }
})
export default store;