import { Modal, Box, Typography, List, ListItem, ListItemButton, CardMedia, FormControl, Select, MenuItem, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import ReactPlayer from 'react-player/lazy';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useGetAllSeasonsQuery } from '../../store/youtube_api/youtubeAPI';
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetSeasonQuery } from '../../store/youtube_api/youtubeAPI';
import { useEffect } from 'react';

const queryParameters = {
    channelId: youtubeAPIConfig.channelID,
    maxResults: 25,
    apiKey: youtubeAPIConfig.apiKey
};

const style = {
    position: 'relative',
    width: '50vw',
    bgcolor: 'primary.main',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,
    color: '#FFFFFF',
};


export const HHModal = ({ modalOpen, handleModalClose, seasonsData }) => {
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const { data: episodesData, isLoading: episodesLoading } = useGetSeasonQuery(
    selectedSeasonId ? { seasonId: selectedSeasonId, maxResults: 50, apiKey: queryParameters.apiKey } : skipToken
  )
    // Add this useEffect to set season 2 as default when seasons data loads
    useEffect(() => {
        if (seasonsData) {
          const sortedSeasons = sortSeasons(seasonsData);
          // Find season 2 in the sorted seasons
          const season2 = sortedSeasons.find(season => season.title.includes('2'));
          if (season2) {
            setSelectedSeasonId(season2.id);
          }
        }
      }, [seasonsData]);

      const onClickEpisode = (episodeId) => {
        navigate(`/watch/${episodeId}`);
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
          overflow: 'auto',
        }}
      >
        <Box>
        <Box sx={{ position: "relative", pt: "56.25%" }}>
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
              zIndex: 3,
            }}
          >
            <CloseIcon />
          </Button>
          <CardMedia
            component="img"
            alt="hh banner"
            image="../../../hh-logo-large.png"
            sx={{
              position: "absolute",
              bottom: { xs: "8px", md: "16px" },
              left: { xs: "32px", md: "32px" },
              width: { xs: "150px", sm: "200px", md: "300px" },
              height: "auto",
              zIndex: 3,
            }}
          />
          {/* Invisible overlay to block interactions */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              zIndex: 2, // Make sure it's above the video
            }}
          />                
          {/* Video player */}
          <ReactPlayer
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
            }}
            url="https://www.youtube.com/watch?v=vFHIBiV65Us"
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  rel: 0,
                  controls: 0,
                  autoplay: 1,
                  iv_load_policy: 3,
                  start: 60,
                },
              },
            }}
          />
        </Box>
          <Box sx={style}>
            <Grid container>
              
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
                onChange={(e) => setSelectedSeasonId(e.target.value)}
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
                          <ListItemButton onClick={() => onClickEpisode(episode.snippet.resourceId.videoId)}>
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
        </Box>
      </Modal>
  )
}
