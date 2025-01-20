import { Box, Card, CardContent, CardMedia, Modal, Typography } from "@mui/material"
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const HomePage = () => {
  
  const dispatch = useDispatch();
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);

  const {data:seasonsData , isLoading: seasonsLoading } = useGetAllSeasonsQuery(queryParameters);
  const { data: episodesData, isLoading: episodesLoading } = useGetSeasonQuery(
    selectedSeasonId ? { seasonId: selectedSeasonId, apiKey: queryParameters.apiKey } : skipToken
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
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
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
