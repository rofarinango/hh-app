import { createSlice } from '@reduxjs/toolkit';

export const hhSlice = createSlice({
    name: 'hh',
    initialState: {
        episodesPerSeason: [],
        seasons: [],
        isLoadingSeasons: false,
        isLoadingEpisodes: false,
    },
    reducers: {
        startLoadingEpisodes: (state, /* action */ ) => {
            state.isLoadingEpisodes = true;
        },
        startLoadingSeasons: ( state ) => {
            state.isLoadingSeasons = true;
        },
        setEpisodes: ( state, action ) => {
            state.isLoadingEpisodes = false;
            state.episodes = action.payload.episodes;
        },
        setSeasons: ( state, action ) => {
            state.isLoadingSeasons = false;
            state.seasons = action.payload.seasons;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    startLoadingEpisodes,
    startLoadingSeasons,
    setEpisodes,
    setSeasons,
 } = hhSlice.actions;