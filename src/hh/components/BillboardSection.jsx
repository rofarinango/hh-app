import { Box, Button, CardMedia } from '@mui/material';
import ReactPlayer from 'react-player/lazy';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useNavigate } from 'react-router-dom';

export const BillboardSection = ({ randomEpisode, isMuted, setIsMuted }) => {
  const navigate = useNavigate();
  return (
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
  )
}
