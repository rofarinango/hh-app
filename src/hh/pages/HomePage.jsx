import { Box, Button, Card, CardContent, CardMedia, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";
import { useGetAllSeasonsQuery, useGetSeasonQuery } from "../../store/youtube_api";
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";
import Grid from "@mui/material/Grid2"

const queryParameters = {
  channelId: youtubeAPIConfig.channelID,
  maxResults: 25,
  apiKey: youtubeAPIConfig.apiKey
};

const style = {
  position: 'relative',
  width: 600,
  maxHeight: '90vh', // Limit modal height to 90% of the viewport
  overflowY: 'auto', // Enable vertical scrolling within the modal
  bgcolor: 'primary.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

export const HomePage = () => {
  
  const dispatch = useDispatch();
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

  const {data:seasonsData , isLoading: seasonsLoading } = useGetAllSeasonsQuery(queryParameters);
  const { data: episodesData, isLoading: episodesLoading } = useGetSeasonQuery(
    selectedSeasonId ? { seasonId: selectedSeasonId, maxResults: 50, apiKey: queryParameters.apiKey } : skipToken
  )
  
  // Modal to show episodes and info logic

  //  State to open and close modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const onClickSeason = (seasonId) => {
    console.log(`I clicked season id: ${seasonId}`);
    setSelectedSeasonId(seasonId);
  }

  return (
    <>
      <Grid
        container
        direction='column'
        sx={{
          minHeight: '100vh', 
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Grid size={12} sx={{
          textAlign:'center'
        }}>
          <Typography variant="h1">Show Title</Typography>
        </Grid>

        <Grid
          container
          direction="row"
          alignItems="flex-start"
          spacing={2}
          sx={{ padding: 4 }}
        >
          {/* Example Card */}
          <Grid size={4}>
            <Card onClick={handleModalOpen} sx={{"&:hover": { cursor: "pointer" }, maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="hh banner"
                height="200"
                image="../../../public/hh-logo.jpg" // TODO get banner from API
              />
            </Card>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'auto', // Enable scrolling for the entire modal
              }}
            >
              <Box sx={style}>
                <Grid container>
                  <Grid size={12}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Show title
                  </Typography>
                  </Grid>
                  <Grid size={8}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Episodios
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                  <FormControl fullWidth>
                    <InputLabel 
                      sx={{
                        color: 'white', // Default color
                        '&.Mui-focused': {
                          color: 'white', // Color when focused
                        },
                        '&.MuiFormLabel-filled': {
                          color: 'white', // Color when filled (value selected)
                        },
                      }} 
                      id="season-select-label">Season</InputLabel>
                    <Select 
                      labelId="season-select-label"
                      id="season-select"
                      value={selectedSeasonId || ""}
                      label="season"
                      onChange={(e) => setSelectedSeasonId(e.target.value)} // Update state on change
                      sx={{
                        color: 'white',
                        '.MuiOutlinedInput-notchedOutline': {
                          borderColor: '#808080', // Border color
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#808080', // Focused border color
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#808080', // Hover border color
                        },
                        '.MuiSelect-icon': {
                          color: '#808080', // Dropdown arrow color
                        },
                      }}
                    >
                        {seasonsData?.items?.map((season) => (
                          <MenuItem value={season.id} key={season.id}>
                            {season.snippet.title}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  </Grid>
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
                </Grid>
              </Box>
            </Modal>
          </Grid>
        </Grid>

        {/* {seasonsLoading ? (
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
        } */}

      </Grid>
      
    </>
  )
}
