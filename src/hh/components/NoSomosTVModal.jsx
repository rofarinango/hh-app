import { Modal, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export const NoSomosTVModal = ({ open, onClose, episodes }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: '50%', bgcolor: 'background.paper', p: 4 }}>
        <Typography variant="h6">Select an Episode</Typography>
        <List>
          {episodes.map((episode) => (
            <ListItem button key={episode.id} onClick={() => onClickEpisode(episode.snippet.resourceId.videoId)}>
              <ListItemText primary={episode.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
}; 