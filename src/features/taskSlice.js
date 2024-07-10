import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

export const showTask = createAsyncThunk('showTask', async(args, {rejectWithValue}) => {
    try {
        const response = await axios.get("http://localhost:3000/tasks")
        const result = await response.data
        return result
    } catch (error) {
        return rejectWithValue(error)

    }
})

export const addTask = createAsyncThunk('addTask', async(args, {rejectWithValue}) => {
    try {
         const {name, task} = args
        const response = await axios.post("http://localhost:3000/tasks/add", {name: name, task: task })
        const result = await response.data
        return result
    } catch (error) {
        return rejectWithValue(error)                
    }
})

export const deleteTask = createAsyncThunk('deleteTask', async(id, {rejectWithValue}) => {
     console.log(id)
     try {
        const response = await axios.delete(`http://localhost:3000/tasks/delete/${id}`)
        const result = await response.data
        return result
     } catch (error) {
        return rejectWithValue(error)        
     }
})

export const updateTask = createAsyncThunk('updateTask', async(args, {rejectWithValue}) => {
    const {taskId, name, task} = args
    try {
        const response = await axios.put(`http://localhost:3000/tasks/edit/${taskId}`, {name, task})
        const result = await response.data
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const completeTask = createAsyncThunk('completeTask', async(args, {rejectWithValue}) => {
    const {id, complete} = args

    try {
        const response = await axios.post(`http://localhost:3000/tasks/completed/${id}`, {complete})
        const result = await response.data
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
}) 

const initialState = {
    tasks : [],
    loading: false,
    error: null
}

const taskSlice = createSlice({
    name: "task",
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(showTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(showTask.fulfilled, (state, action) => {
                console.log(action.payload)
                state.tasks = action.payload
                state.loading = false;
            })
            .addCase(showTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks = [...state.tasks, action.payload];
                state.loading = false;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                    state.tasks = state.tasks.filter((ele) => ele.id !== id);
                }
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((ele) => 
                ele.id === action.payload.id ? action.payload : ele
                )
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(completeTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(completeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((ele) => 
                ele.id === action.payload.id ? action.payload : ele
                )
            })
            .addCase(completeTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default taskSlice.reducer