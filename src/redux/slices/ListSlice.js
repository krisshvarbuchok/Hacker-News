import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
console.log(import.meta.env.VITE_API_BASE_URL);

const getList = async() => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v0/newstories.json?print=pretty`);
    return response.data;
}
const getListRefresh = async() => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v0/newstories.json?print=pretty`); 
    return response.data;
}

const fetchGetListRefresh = createAsyncThunk('list/fetchGetListRefresh', async() =>{
    const data = await getListRefresh();
    return data.slice(0, 100);
})
const fetchGetList = createAsyncThunk('list/fetchGetList', async() =>{
    const data = await getList();
    return data.slice(0, 100);
})

const getInfo = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v0/item/${id}.json?print=pretty`);
    return response.data;
}

const fetchGetInfo = createAsyncThunk('info/fetchGetInfo', async(id) => {
    const data = await getInfo(id);
    return data;
})
const getInfoAboutComments = async(id) =>{
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/v0/item/${id}.json?print=pretty`);
    return response.data;
}
const fetchGetInfoAboutComments = createAsyncThunk('comments/fetchGetInfoAboutComments', async(id) =>{
    const data = await getInfoAboutComments(id);
    return data;
})


const ListSlice = createSlice({
    name: 'list',
    initialState: {
        data: [],
        info: [],
        comments: [],
        status : null,
        error: null,
    },
    reducers: {
        cleverComments: (state, action) => {
            state.comments = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetList.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchGetListRefresh.fulfilled, (state, action) => {
                if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) {
                    state.data = action.payload;
                }
            })
            .addCase(fetchGetInfo.fulfilled, (state, action) => {
                if(action.payload && action.payload.id && !state.info.find(item => item.id === action.payload.id)) state.info.push(action.payload);
                state.info.sort((a, b) => b.time - a.time);
                if(state.info.length > 100) state.info = state.info.slice(0, 100);
            })
            .addCase(fetchGetInfo.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(fetchGetInfoAboutComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetInfoAboutComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const {id} = action.payload;
                if(state.comments.every(item => item.id !== id))state.comments.push(action.payload);
                
            })
         
    }
})
export const {cleverComments} = ListSlice.actions;
export {fetchGetList, fetchGetListRefresh, fetchGetInfo, fetchGetInfoAboutComments};
export default ListSlice.reducer;