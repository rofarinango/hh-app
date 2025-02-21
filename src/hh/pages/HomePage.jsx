import { Box, Button, Card, CardContent, CardMedia, Divider, FormControl, InputLabel, List, ListItem, ListItemButton, ListItemText, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getEpisodesPerSeason, getSeasons } from "../../store/hh";
import { useGetAllSeasonsQuery, useGetSeasonQuery, useGetNSTVShowsQuery } from "../../store/youtube_api/youtubeAPI";
import youtubeAPIConfig from "../../store/youtube_api/config";
import { skipToken } from "@reduxjs/toolkit/query";
import Grid from "@mui/material/Grid2"
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { NavBar, NSTVCard, HHCard, HHModal, NSTVModal } from '../components/';
import { BillboardSection } from '../components/';

const queryParameters = {
  channelId: youtubeAPIConfig.channelID,
  maxResults: 25,
  apiKey: youtubeAPIConfig.apiKey
};

export const HomePage = () => {
  const dispatch = useDispatch();
  const [isMuted, setIsMuted] = useState(true);
  const mainContainerRef = useRef(null);
  const [HHModalOpen, setHHModalOpen] = useState(false);
  const [NSTVModalOpen, setNSTVModalOpen] = useState(false);
  const [selectedShowId, setSelectedShowId] = useState('PLulPTG0FIeBvixQoSuIWvTxzRvhrK6d8_');

  const {data:seasonsData , isLoading: seasonsLoading } = useGetAllSeasonsQuery(queryParameters);
  const { data: NSTVData, isLoading: NSTVLoading } = useGetNSTVShowsQuery();

  // Add state for random episode
  const [randomEpisode, setRandomEpisode] = useState(null);

  // Add useEffect to select random episode when seasons and episodes load
  useEffect(() => {
    if (seasonsData && NSTVData && !randomEpisode) {
      const allShows = [...seasonsData, ...NSTVData];
      const randomShow = allShows[Math.floor(Math.random() * allShows.length)];
      
      // Fetch episodes for the random show
      fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${randomShow.id}&key=${queryParameters.apiKey}`)
        .then(response => response.json())
        .then(data => {
          const episodes = data.items;
          const randomEp = episodes[Math.floor(Math.random() * episodes.length)];
          setRandomEpisode(randomEp);
        });
    }
  }, [seasonsData, NSTVData]);

  const handleHHModalOpen = () => setHHModalOpen(true);
  const handleHHModalClose = () => setHHModalOpen(false);

  const handleNSTVModalOpen = (showId) => {
    setSelectedShowId(showId);
    setNSTVModalOpen(true);
  };

  const handleNSTVModalClose = () => setNSTVModalOpen(false);

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
      {/* NavBar Section  */}
      <NavBar />
      {/* Main Container for Preview and Sections */}
      <Box sx={{ position: 'relative' }}>

        {/* Billboard Section */}
        <BillboardSection 
          randomEpisode={randomEpisode} 
          isMuted={isMuted} 
          setIsMuted={setIsMuted}
        />

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
                <Grid key={item} xs={12} sm={6} md={3} size={3}>
                  <HHCard 
                    onClick={() => handleHHModalOpen()}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Shows Section */}
          <Box sx={{ px: { xs: 8, sm: 8, md: 8 }, mb: 8 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 3
              }}
            >
              Shows
            </Typography>
            <Grid container spacing={2}>
              {NSTVData && NSTVData.slice(0, 4).map(show => (
                <Grid size={3} xs={12} sm={6} md={3} key={show.id}>
                  <NSTVCard 
                    show={show} 
                    onClick={() => handleNSTVModalOpen(show.id)}
                  />
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
                    onClick={handleHHModalOpen}
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

      <HHModal 
        modalOpen={HHModalOpen}
        handleModalClose={handleHHModalClose}
        seasonsData={seasonsData}
      />
      <NSTVModal 
        open={NSTVModalOpen}
        onClose={handleNSTVModalClose}
        showId={selectedShowId}
      />
    </Box>
  )
}
