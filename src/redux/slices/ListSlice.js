import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getList = async() => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    return response.data;
}
const getListRefresh = async() => {
    const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    console.log('reshesh in redux');
    
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
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    //console.log(response.data);
    
    return response.data;
}

const fetchGetInfo = createAsyncThunk('info/fetchGetInfo', async(id) => {
    const data = await getInfo(id);
    //console.log(data);
    
    return data;
})
const getInfoAboutComments = async(id) =>{
    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
    //console.log(response.data);
    
    return response.data;
}
const fetchGetInfoAboutComments = createAsyncThunk('comments/fetchGetInfoAboutComments', async(id) =>{
    const data = await getInfoAboutComments(id);
    //console.log('update comm', data);
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
            .addCase(fetchGetList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGetList.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(fetchGetListRefresh.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetListRefresh.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGetListRefresh.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.payload;
            })
            .addCase(fetchGetInfo.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchGetInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(!state.info.find(item => item.id === action.payload.id)) state.info.push(action.payload);
                state.info.sort((a, b) => b.time - a.time);
               
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