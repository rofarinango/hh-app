import { Box, Button, Card, CardContent, CardMedia, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";
import { useGetAllSeasonsQuery, useGetSeasonQuery } from "../../store/youtube_api/youtubeAPI";
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";
import Grid from "@mui/material/Grid2"
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavBar } from '../components/NavBar';

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

export const HomePage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedSeasonId, setSelectedSeasonId] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const mainContainerRef = useRef(null);

  const {data:seasonsData , isLoading: seasonsLoading } = useGetAllSeasonsQuery(queryParameters);
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

  // Add state for random episode
  const [randomEpisode, setRandomEpisode] = useState(null);

  // Add useEffect to select random episode when seasons and episodes load
  useEffect(() => {
    if (seasonsData && !randomEpisode) {
      const sortedSeasons = sortSeasons(seasonsData);
      // Select random season
      const randomSeason = sortedSeasons[Math.floor(Math.random() * sortedSeasons.length)];
      
      // Fetch episodes for random season
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${randomSeason.id}&key=${queryParameters.apiKey}`)
        .then(response => response.json())
        .then(data => {
          const episodes = data.items;
          // Select random episode
          const randomEp = episodes[Math.floor(Math.random() * episodes.length)];
          setRandomEpisode(randomEp);
        });
    }
  }, [seasonsData]);

  // Modal to show episodes and info logic

  //  State to open and close modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const onClickSeason = (seasonId) => {
    console.log(`I clicked season id: ${seasonId}`);
    setSelectedSeasonId(seasonId);
  }

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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        setScrollPosition(mainContainerRef.current.scrollTop);
      }
    };

    const container = mainContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Box
      ref={mainContainerRef}
      data-main-container
      sx={{
        height: '100vh',
        overflow: 'auto',
        bgcolor: 'black',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        scrollbarWidth: 'none',
      }}
    >
      <NavBar />
      {/* Main Container for Preview and Sections */}
      <Box sx={{ position: 'relative' }}>
        {/* Preview Section */}
        <Box sx={{ 
          position: 'relative', 
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}>
          {randomEpisode && (
            <>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '100%',
                  '@media (min-width: 1500px)': {
                    width: '100vw',
                    height: '100vh',
                  }
                }}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${randomEpisode.snippet.resourceId.videoId}`}
                  width="110%"
                  height="110%"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) scale(1.1)',
                    width: '100%',
                    height: '100%',
                  }}
                  config={{
                    youtube: {
                      playerVars: {
                        rel: 0,
                        autoplay: 1,
                        controls: 0,
                        fs: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                        start: 20
                      }
                    }
                  }}
                  playing
                  loop
                  muted={isMuted}
                />
              </Box>
              {/* Gradient Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '70%',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 15%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,1) 100%)',
                  zIndex: 1
                }}
              />
              {/* Logo, Title, and Card Section */}
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: '45%', sm: '50%', md: '55%' },
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  px: { xs: 8, sm: 8, md: 8 },
                  transform: 'translateY(-50%)',
                }}
              >
                {/* Logo and Controls Section */}
                <Box sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}>
                  {/* Logo */}
                  <CardMedia
                    component="img"
                    alt="HH Logo"
                    src="/hh-logo-large.png"
                    sx={{
                      width: { xs: '220px', sm: '320px', md: '420px' },
                      height: 'auto',
                    }}
                  />
                  {/* Controls Row */}
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                    {/* Ver Episodio Button */}
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/watch/${randomEpisode.snippet.resourceId.videoId}`)}
                      sx={{
                        bgcolor: 'white',
                        color: 'black',
                        fontWeight: 'bold',
                        px: 4,
                        width: { xs: '220px', sm: '320px', md: '420px' },
                        height: '50px',
                        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.75)',
                        }
                      }}
                    >
                      Ver Episodio
                    </Button>

                    {/* Mute Button */}
                    <Button
                      variant="contained"
                      onClick={() => setIsMuted(!isMuted)}
                      sx={{
                        minWidth: '44px',
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        bgcolor: 'rgba(109, 109, 110, 0.7)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'rgba(109, 109, 110, 0.4)',
                        }
                      }}
                    >
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Box>

        {/* Content Sections */}
        <Box sx={{ 
          position: 'relative',
          zIndex: 2,
          bgcolor: 'black',
          mt: -20, // Overlap with the preview section
        }}>
          {/* Popular Episodes Section */}
          <Box sx={{ 
            px: { xs: 8, sm: 8, md: 8 }, 
            mb: 8,
          }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Popular Episodes
            </Typography>
            <Grid container spacing={2}>
              {/* Add your episode cards here */}
              {[1, 2, 3, 4].map((item) => (
                <Grid key={item} size={3}>
                  <Card 
                    onClick={handleModalOpen}
                    sx={{
                      "&:hover": { 
                        cursor: "pointer",
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out'
                      },
                      bgcolor: 'transparent'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image="../../../hh-logo.jpg"
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Best Shows Section */}
          <Box sx={{ px: { xs: 8, sm: 8, md: 8 }, mb: 8 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Best Shows
            </Typography>
            <Grid container spacing={2}>
              {/* Add your show cards here */}
              {[1, 2, 3, 4].map((item) => (
                <Grid key={item} size={3}>
                  <Card 
                    onClick={handleModalOpen}
                    sx={{
                      "&:hover": { 
                        cursor: "pointer",
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out'
                      },
                      bgcolor: 'transparent'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image="../../../hh-logo.jpg"
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Trending Section */}
          <Box sx={{ px: { xs: 8, sm: 8, md: 8 }, mb: 8 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Trending
            </Typography>
            <Grid container spacing={2}>
              {/* Add your trending cards here */}
              {[1, 2, 3, 4].map((item) => (
                <Grid key={item} size={3}>
                  <Card 
                    onClick={handleModalOpen}
                    sx={{
                      "&:hover": { 
                        cursor: "pointer",
                        transform: 'scale(1.05)',
                        transition: 'transform 0.3s ease-in-out'
                      },
                      bgcolor: 'transparent'
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image="../../../hh-logo.jpg"
                      sx={{ objectFit: 'cover' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>

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
                            {console.log(episode)
                            }
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
    </Box>
  )
}
