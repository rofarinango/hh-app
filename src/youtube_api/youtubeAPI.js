import axios from 'axios';

export const youtubeAPI = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3'
});