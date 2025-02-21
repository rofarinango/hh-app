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
            transformResponse: (response) => {
                // Fallback to an empty array if response.items is undefined
                const items = response?.items || [];
            
                const toSentenceCase = (text) =>
                    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            
                return items.map((item) => {
                    const title = item.snippet.title;
            
                    // Match text inside square brackets
                    const match = title.match(/\[(.*?)\]/g);
                    let extractedText;
            
                    if (match && match.length) {
                        // Extract the first match without brackets
                        extractedText = match[0].slice(1, -1);
                    } else {
                        // Extract text after the first '-' if no brackets are found
                        const dashIndex = title.indexOf('-');
                        extractedText = dashIndex !== -1 ? title.slice(dashIndex + 1).trim() : title;
                    }
            
                    // Convert to Sentence Case
                    const sentenceCasedTitle = extractedText
                        .split(' ')
                        .map(toSentenceCase)
                        .join(' ');
            
                    return {
                        id: item.id,
                        title: sentenceCasedTitle,
                        ...item,
                    };
                });
            }
            
        }),

        // New endpoint to get No Somos TV shows
        getNSTVShows: builder.query({
            query: () => `/playlists?part=status,snippet&channelId=UCZFRsDLdgYLUIbQBSsdyVGg&maxResults=50&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`,
            transformResponse: (response) => {
                return response.items
                    .filter(item => item.snippet.thumbnails.high.url && !item.snippet.thumbnails.high.url.includes("no_thumbnail")) // Exclude items with "no_thumbnail"
                    .map(item => ({
                        id: item.id,
                        title: item.snippet.title,
                        thumbnailUrl: item.snippet.thumbnails.high.url, // Use high resolution thumbnail
                    }));
            }
        }),

        searchVideos: builder.mutation({
            query: (params) => ({
                url: 'search',
                method: 'GET',
                params: {
                    ...params,
                    part: 'snippet',
                    type: 'video',
                }
            })
        }),

        // New endpoint to get episodes from a selected playlist
        getEpisodesFromShow: builder.query({       
            query: ({ showId, maxResults, apiKey }) => 
                `/playlistItems?part=snippet&playlistId=${showId}&maxResults=${maxResults}&key=${apiKey}`,
            transformResponse: (response) => {
                // Fallback to an empty array if response.items is undefined
                return response?.items || [];
            }
        }),
    })
});

export const { 
    useGetAllSeasonsQuery, 
    useGetSeasonQuery,
    useGetNSTVShowsQuery,
    useGetEpisodesFromShowQuery,
    useSearchVideosMutation,
} = youtubeAPI;
