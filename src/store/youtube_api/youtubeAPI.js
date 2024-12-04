import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const youtubeAPI = createApi({
    reducerPath: 'youtube',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube.googleapis.com/youtube/v3'
    }),

    endpoints: (builder) => ({
        getSeasons: builder.query({
            query: () => '/playlists'
        })
    })
});

export const { useGetSeasonsQuery } = youtubeAPI;