import { Card, CardMedia} from '@mui/material';

export const NSTVCard = ({ show, onClick }) => {
  return (
    <Card 
      onClick={onClick} 
      sx={{
        bgcolor: 'transparent',
        height: 200,
        "&:hover": { 
          cursor: 'pointer',
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
          objectFit: 'fit'
        }}
      />
    </Card>
  );
}; 