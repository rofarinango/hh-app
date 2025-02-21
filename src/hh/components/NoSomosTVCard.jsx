import { Card, CardMedia, CardContent, Typography } from '@mui/material';

export const NoSomosTVCard = ({ show, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      sx={{
        cursor: 'pointer',
        bgcolor: 'transparent',
        height: 300,
        "&:hover": { 
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease-in-out'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={show.thumbnailUrl}
        alt={show.title}
        sx={{ 
          objectFit: 'cover',
          height: '100%',
          width: '100%',
        }}
      />
      <CardContent>
        <Typography variant="h6" sx={{ color: 'white' }}>
          {show.title}
        </Typography>
      </CardContent>
    </Card>
  );
}; 