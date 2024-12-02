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
            state.isLoading = false;
            console.log(action);
            state.episodes = action.payload.episodes;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    startLoadingEpisodes,
    setEpisodes
 } = hhSlice.actions;