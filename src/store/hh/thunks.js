import { youtubeAPI } from "../../youtube_api";
import youtubeAPIConfig from "../../youtube_api/config";
import { setEpisodes, setSeasons, startLoadingEpisodes, startLoadingSeasons } from "./hhSlice"

const channel_id = youtubeAPIConfig.channelID;
const api_key = youtubeAPIConfig.youtubeAPIKey;
const max_results = 25;

export const getSeasons = () => {
    return async( dispatch, getState ) => {
        dispatch( startLoadingSeasons() );

        // TODO: make http request

        const { data } = await youtubeAPI.get(`/playlists?part=snippet&channelId=${channel_id}&maxResults=${max_results}&key=${api_key}`)
        
        // console.log(data);
        

        dispatch( setSeasons({ seasons: data.items }) );
    }
}

export const getEpisodesPerSeason = ( season = 2 ) => {
    return async( dispatch, getState ) => {
        dispatch( startLoadingEpisodes() );
        const season_id = getSeasonId(getState, season);

        //const { data } = await youtubeAPI.get(`/playlistItems?part=snippet&playlistId=${season_id}&key=${api_key}`);
        // console.log(data);
    }
}

const getSeasonId = (getState, season) => {
    const currentState = getState();
    // console.log(currentState);
    return 0;
}