import { Grid2, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";

export const HomePage = () => {
  
  const { seasons } = useSelector(state => state.hh)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getSeasons() );
  }, [])
  
  const onClickSeason = (season) => {
    dispatch( getEpisodesPerSeason(season) );
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
        <ul>
          {
            seasons.map( season => (
              <li key={season.id} >{season.snippet.title}</li>
            ))
          }
        </ul>

      </Grid2>
      
    </>
  )
}
