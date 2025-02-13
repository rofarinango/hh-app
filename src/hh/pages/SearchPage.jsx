import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm, searchResults } = location.state || {};

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'black',
      }}
    >
      <NavBar />
      <Box 
        sx={{ 
          pt: 10,
          px: { xs: 8, sm: 8, md: 8 }
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white', 
            mb: 4,
            fontWeight: 'bold' 
          }}
        >
          Results for "{searchTerm}"
        </Typography>

        <Grid container spacing={2}>
          {searchResults?.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id}>
              <Card 
                onClick={() => navigate(`/watch/${video.snippet.resourceId.videoId}`)}
                sx={{
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  sx={{ aspectRatio: '16/9' }}
                />
                <CardContent 
                  sx={{ 
                    bgcolor: 'rgba(0,0,0,0.7)',
                    '&:last-child': { pb: 2 } // Override MUI's default padding
                  }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'white',
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.2,
                      minHeight: '2.4em' // Ensure consistent height for 2 lines
                    }}
                  >
                    {video.snippet.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}; 