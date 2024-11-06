import { createSlice } from "@reduxjs/toolkit";

const OpenNewSlice = createSlice({
    name: 'openNew',
    initialState: {},
    reducers:{
        setOpenNew: (state, action)=>{
            console.log(action.payload);
            
            return state = action.payload;
           
            
        }
    }
})
export const {setOpenNew} = OpenNewSlice.actions;
export default OpenNewSlice.reducer;