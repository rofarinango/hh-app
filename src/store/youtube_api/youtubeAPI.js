import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getEpisodesPerSeason } from "../hh";

export const youtubeAPI = createApi({
    reducerPath: 'youtube',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube.googleapis.com/youtube/v3'
    }),

    endpoints: (builder) => ({
        getAllSeasons: builder.query({
            query: ({channelId, maxResults, apiKey}) => `/playlists?part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`
        }),

        getSeason: builder.query({
            query: ({seasonId, maxResults, apiKey}) => `/playlistItems?part=snippet&playlistId=${seasonId}&maxResults=${maxResults}&key=${apiKey}`
        })
    })
});

export const { useGetAllSeasonsQuery, useGetSeasonQuery } = youtubeAPI;