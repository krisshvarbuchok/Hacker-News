import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const updateOpenNew = async(id) => {
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    return response.data;
}
const fetchUpdateOpenNew = createAsyncThunk('openNew/fetchUpdateOpenNew', async(id) =>{
    const data = await updateOpenNew(id);
    return data;
})

const OpenNewSlice = createSlice({
    name: 'openNew',
    initialState: {
        statusNew: null,
        open: {},
    },
    reducers: {
        setOpenNew: (state, action) => {
            state.open = action.payload;
        },
        cleverOpenNew: (state, action) => {
            state.open = {};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUpdateOpenNew.pending, (state, action) => {
                state.statusNew = 'loading';
            })
            .addCase(fetchUpdateOpenNew.fulfilled, (state, action) => {
                state.statusNew = 'succeeded';
                state.open = action.payload;
            })
    }
})
export const { setOpenNew, cleverOpenNew } = OpenNewSlice.actions;
export {fetchUpdateOpenNew};
export default OpenNewSlice.reducer;