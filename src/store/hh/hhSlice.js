import { createSlice } from '@reduxjs/toolkit';

export const hhSlice = createSlice({
    name: 'hh',
    initialState: {
        episodes: [],
    },
    reducers: {
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
});


// Action creators are generated for each case reducer function
export const { increment } = hhSlice.actions;