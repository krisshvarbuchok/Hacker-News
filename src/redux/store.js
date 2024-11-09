import { configureStore } from "@reduxjs/toolkit";
import ListSlice from "./slices/ListSlice";
import OpenNewSlice from "./slices/OpenNewSlice";
import PagesSlice from "./slices/PagesSlice";

const store = configureStore({
    reducer: {
        list: ListSlice,
        open: OpenNewSlice,
        page: PagesSlice,
    }
})
export default store;