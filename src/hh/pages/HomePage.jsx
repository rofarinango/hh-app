import { Grid2, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";
import { useGetAllSeasonsQuery, useGetSeasonQuery } from "../../store/youtube_api";
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";

const queryParameters = {
  channelId: youtubeAPIConfig.channelID,
  maxResults: 25,
  apiKey: youtubeAPIConfig.apiKey
};

export const HomePage = () => {
  
  // const { seasons } = useSelector(state => state.hh)
  const dispatch = useDispatch();
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

  const {data:seasonsData , isLoading: seasonsLoading } = useGetAllSeasonsQuery(queryParameters);
  // console.log(playlists);
  // const { data: playlistItems, isLoading } = useGetSeasonQuery({seasonId:'PLV728iQwb_4XgxeHFIlwR0VoQrCeHKxIy', apiKey: queryParameters.apiKey});
  const { data: episodesData, isLoading: episodesLoading } = useGetSeasonQuery(
    selectedSeasonId ? { seasonId: selectedSeasonId, apiKey: queryParameters.apiKey } : skipToken
  )
  
  const onClickSeason = (seasonId) => {
    // dispatch( getEpisodesPerSeason(season) );
    console.log(`I clicked season id: ${seasonId}`);
    setSelectedSeasonId(seasonId);
  }

  return (
    <>
      <Grid2
        container
        sx={{
          minHeight: '100vh', 
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <Typography variant="h1" sx={{
        
        }}>Temporadas</Typography>
        {seasonsLoading ? (
          <Typography>Loading Seasons...</Typography>
        ) : (
          <ul>
            {seasonsData?.items?.map((season) => (
              <li key={season.id} onClick={() => onClickSeason(season.id)}>
                {season.snippet.title}
              </li>
            ))}
          </ul>
        )}

        {
          episodesLoading ? (
            <Typography>Loading Episodes...</Typography>
          ) : selectedSeasonId && episodesData ? (
            <div>
              <Typography variant="h2">Episodios</Typography>
              <ul>
                {episodesData.items.map((episode) => (
                  <li key={episode.id}>{episode.snippet.title}</li>
                ))}
              </ul>
            </div>
          ) : null
        }

      </Grid2>
      
    </>
  )
}
