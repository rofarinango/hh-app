import { Grid2, Typography } from "@mui/material"

export const HomePage = () => {
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
