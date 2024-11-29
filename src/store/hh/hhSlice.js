import { createSlice } from '@reduxjs/toolkit';

export const hhSlice = createSlice({
    name: 'hh',
    initialState: {
        episodes: [],
        isLoading: false,
    },
    reducers: {
        startLoadingEpisodes: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setEpisodes: ( state, action ) => {
            console.log(action);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    startLoadingEpisodes,
    setEpisodes
 } = hhSlice.actions;