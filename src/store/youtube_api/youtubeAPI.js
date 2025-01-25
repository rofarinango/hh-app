import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const youtubeAPI = createApi({
    reducerPath: 'youtube',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://youtube.googleapis.com/youtube/v3'
    }),

    endpoints: (builder) => ({
        getAllSeasons: builder.query({
            query: ({ channelId, maxResults, apiKey }) =>
                `/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`,
            transformResponse: (response) => {
                const seasonNameToNumber = {
                    'Primera': 1,
                    'Segunda': 2,
                    'Tercera': 3,
                    'Cuarta': 4,
                    'Quinta': 5,
                    'Sexta': 6,
                    'Séptima': 7,
                    'Octava': 8,
                };
                const filteredItems = response.items.filter((item) => {
                    const title = item.snippet.title;
                    return /\[Segunda Temporada\]/i.test(title) || /\[.*?Temporada\]/i.test(title);
                });

                return filteredItems.map((item) => {
                    const match = item.snippet.title.match(/\[(.*?)\s*Temporada\]/i);
                    const seasonName = match ? match[1] : '';
                    const seasonNumber = seasonNameToNumber[seasonName] || seasonName.replace(/\D+/g, '');
                    return {
                        id: item.id,
                        title: seasonNumber ? `Temporada ${seasonNumber}` : seasonName,
                        totalEpisodes: item.contentDetails.itemCount,
                        ...item,
                    };
                });
            },
        }),

        getSeason: builder.query({
            query: ({ seasonId, maxResults, apiKey }) =>
                `/playlistItems?part=snippet&playlistId=${seasonId}&maxResults=${maxResults}&key=${apiKey}`,
        })
    })
});

export const { useGetAllSeasonsQuery, useGetSeasonQuery } = youtubeAPI;
