import { useState, useRef } from 'react';
import { InputBase, IconButton, Paper, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const SearchBar = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  
  // Get all episodes from Redux store
  const allEpisodes = useSelector(state => {
    const queries = state.youtube.queries;
    return Object.keys(queries)
      .filter(key => key.startsWith('getSeason'))
      .reduce((acc, key) => {
        const episodes = queries[key].data || [];
        return [...acc, ...episodes];
      }, []);
  });

  // Add logic to include "No Somos TV" episodes
  const allShows = useSelector(state => state.hh.shows); // Assuming shows are stored in Redux
  const allVideos = [...allEpisodes, ...allShows]; // Combine both sources

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        setIsLoading(true);
        const filteredResults = allVideos.filter(video => 
          video.snippet.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // First close the search bar
        onClose();

        // Then navigate with the search results
        await navigate('/search', {
          state: { 
            searchTerm,
            searchResults: filteredResults 
          }
        });
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClose();
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        bgcolor: '#141414',
        border: '1px solid #333'
      }}
    >
      <IconButton type="submit" sx={{ p: '10px', color: 'grey.500' }}>
        <SearchIcon />
      </IconButton>
      <InputBase
        ref={inputRef}
        sx={{ ml: 1, flex: 1, color: 'white' }}
        placeholder="Títulos, personas, géneros"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      {isLoading && (
        <CircularProgress size={20} sx={{ mr: 1, color: 'grey.500' }} />
      )}
      {searchTerm && (
        <IconButton 
          sx={{ p: '10px', color: 'grey.500' }} 
          onClick={handleClear}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
}; 