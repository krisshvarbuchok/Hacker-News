import { createSlice } from "@reduxjs/toolkit";

const OpenNewSlice = createSlice({
    name: 'openNew',
    initialState: {},
    reducers:{
        setOpenNew: (state, action)=>{
            console.log(action.payload);
            return state = action.payload;
        },
        cleverOpenNew: (state, action) => {
            return state = {};
        }
    }
})
export const {setOpenNew, cleverOpenNew} = OpenNewSlice.actions;
export default OpenNewSlice.reducer;