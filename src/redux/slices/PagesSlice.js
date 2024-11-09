import { createSlice } from "@reduxjs/toolkit";

const PageSlice = createSlice({
    name: 'page',
    initialState: 1,
    reducers: {
        setPage: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {setPage} = PageSlice.actions;
export default PageSlice.reducer;