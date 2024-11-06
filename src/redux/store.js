import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "./slices/ListSlice";
import OpenNewSlice from "./slices/OpenNewSlice";

const store = configureStore({
    reducer: {
        list: ListSlice,
        open: OpenNewSlice,
    }
})
export default store;