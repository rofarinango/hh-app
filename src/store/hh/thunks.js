import { youtubeAPI } from "../../youtube_api";
import youtubeAPIConfig from "../../youtube_api/config";
import { setEpisodes, startLoadingEpisodes } from "./hhSlice"

const channel_id = youtubeAPIConfig.channelID;
const api_key = youtubeAPIConfig.youtubeAPIKey;

export const getEpisodes = () => {
    return async( dispatch, getState ) => {
        dispatch( startLoadingEpisodes() );

        // TODO: make http request

        const resp = await youtubeAPI.get(`/playlists?part=snippet&channelId=${channel_id}&key=${api_key}`)
        console.log(resp);
        

        // dispatch( setEpisodes() );
    }
}