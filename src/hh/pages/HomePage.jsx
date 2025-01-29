import { Box, Button, Card, CardContent, CardMedia, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";
import { useGetAllSeasonsQuery, useGetSeasonQuery } from "../../store/youtube_api";
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";
import Grid from "@mui/material/Grid2"
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const queryParameters = {
  channelId: youtubeAPIConfig.channelID,
  maxResults: 25,
  apiKey: youtubeAPIConfig.apiKey
};

const style = {
  position: 'relative',
  width: '50vw',
  // maxHeight: '90vh', // Limit modal height to 90% of the viewport
  // overflowY: 'auto', // Enable vertical scrolling within the modal
  bgcolor: 'primary.main',
  border: '2px solid #000',
  boxShadow: 24,
  p: 6,
  color: '#FFFFFF',
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

  // Function to sort the seasons
  const sortSeasons = (seasons) => {
    return [...seasons].sort((a, b) => {
      const seasonNumberA = parseInt(a.title.match(/\d+/)) || 0;
      const seasonNumberB = parseInt(b.title.match(/\d+/)) || 0;
      return seasonNumberA - seasonNumberB;
    }).slice(1);
  };

  // Sort the seasons data before rendering
  const sortedSeasons = seasonsData ? sortSeasons(seasonsData) : [];

  return (
    <>
      <Grid
        container
        direction='column'
        sx={{
          minHeight: '100vh', 
        }}
      >
        <Grid size={12} sx={{
          textAlign:'center'
        }}>
          <Typography variant="h1">{sortedSeasons[0]?.snippet.channelTitle}</Typography>
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
                image="../../../hh-logo.jpg" // TODO get banner from API
                sx={{objectFit: 'cover'}}
              />
            </Card>
            <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                pt: 4,
                justifyContent: 'center',
                overflow: 'auto', // Enable scrolling for the entire modal
              }}
            >
              <Box sx={style}>
                <Button
                    onClick={handleModalClose}
                    sx={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: "black",
                      color: "text.primary",
                      minWidth: "40px",
                      minHeight: "40px",
                      borderRadius: "50%",
                    }}
                  >
                    <CloseIcon />
                  </Button>
                <Grid container>
                  <Box sx={{width: '100%'}}>
                    <Grid container>
                      <Grid size={8}>
                        <CardMedia
                          component="img"
                          alt="hh banner"
                          height="200"
                          image="../../../hh-logo-large.png" // TODO get banner from API
                          sx={{objectFit: 'contain'}}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Grid size={8} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" id="modal-modal-description" >
                      Episodios
                    </Typography>
                  </Grid>
                  <Grid size={4}>
                  <FormControl fullWidth>
                  <Select
                    labelId="season-select-label"
                    id="season-select"
                    value={selectedSeasonId || sortedSeasons[0]?.id}
                    onChange={(e) => setSelectedSeasonId(e.target.value)} // Update state on change
                    renderValue={(selected) => {
                      // Find the selected season by ID
                      const selectedSeason = sortedSeasons.find((season) => season.id === selected);
                      // Return only the season title
                      return (
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {selectedSeason?.title || ''}
                        </Typography>
                      );
                    }}
                  >
                    {sortedSeasons?.map((season) => (
                      <MenuItem value={season.id} key={season.id}>
                        <Typography sx={{ fontWeight: 'bold' }}>{season.title}</Typography>
                        <Typography component="div">
                          <Box sx={{ textAlign: 'right', fontSize: '12px', width: '95px' }}>
                            ({season.totalEpisodes} episodios)
                          </Box>
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                  </FormControl>
                  </Grid>
                  {
                    episodesLoading ? (
                      <Typography>Loading Episodes...</Typography>
                    ) : selectedSeasonId && episodesData ? (
                      <Box sx={{width: '100%'}}>
                          <List>
                          {episodesData?.map((episode, index) => (
                            <Box key={episode.id} sx={{ position: "relative", "&:hover .play-icon": { opacity: 1 } }}>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <Grid size={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Typography variant="h6">{index + 1}</Typography>
                                </Grid>
                                <Grid size={3} sx={{ padding: 1, position: "relative" }}>
                                  {/* Thumbnail Image */}
                                  <CardMedia
                                    component="img"
                                    alt="thumbnail"
                                    image={episode.snippet.thumbnails.default ? episode.snippet.thumbnails.default.url : "../../../hh-logo.jpg"}
                                    sx={{ width: "100%", borderRadius: "4px" }}
                                  />
                                  {/* Play Icon (Hidden by Default, Shows on Hover) */}
                                  <Box
                                    className="play-icon"
                                    sx={{
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      opacity: 0,
                                      transition: "opacity 0.3s ease-in-out",
                                    }}
                                  >
                                    <svg width="75" height="75" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                      {/* Outer Circle with Thin Outline & Transparent Fill */}
                                      <circle cx="12" cy="12" r="10" strokeWidth="0.5" fill="rgba(0, 0, 0, 0.2)" />
                                      
                                      {/* Play Triangle (Solid White) */}
                                      <polygon points="10,8 16,12 10,16" fill="white" />
                                    </svg>
                                  </Box>
                                </Grid>
                                <Grid size={8} sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                                  <Typography sx={{ fontWeight: "bold" }}>{episode.title}</Typography>
                                </Grid>
                              </ListItemButton>
                            </ListItem>
                            <Divider sx={{ bgcolor: "#3f3f3f", height: "2px", width: "100%" }} />
                          </Box>
                          ))}
                          </List>
                      </Box>
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
