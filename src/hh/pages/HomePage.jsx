import { Grid2, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getEpisodes } from "../../store/hh";

export const HomePage = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( getEpisodes() );
  }, [])
  

  return (
    <>
      <Grid2
        container
        sx={{
          minHeight: '100vh', 
          backgroundColor: 'primary.main',
        }}
      >
        <Typography variant="h1" sx={{
          color: "#FFFFFF"
        }}>Home Page</Typography>
      </Grid2>
    </>
  )
}
