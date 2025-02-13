import { AppBar, Box, Toolbar, IconButton, Typography, Button, Badge, Avatar } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { SearchBar } from './SearchBar';

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Shows', path: '/shows' },
    { label: 'My List', path: '/my-list' }
  ];

  useEffect(() => {
    const handleScroll = (e) => {
      const container = document.querySelector('[data-main-container]');
      if (container) {
        setIsScrolled(container.scrollTop > 0);
      }
    };

    const container = document.querySelector('[data-main-container]');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backgroundImage: isScrolled ? 'none' : 'linear-gradient(180deg, rgba(0,0,0,0.7) 10%, transparent 100%)',
        boxShadow: 'none',
        transition: 'background-color 0.3s ease-in-out',
        zIndex: 1200, // Ensure it's above other content
      }}
    >
      <Toolbar sx={{ gap: 2, justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            edge="start"
            onClick={() => navigate('/')}
            sx={{ 
              mr: 0, 
              pl: { xs: 7, sm: 7, md: 7 } // Match the padding from HomePage content
            }}
          >
            <Box
              component="img"
              src="/hh-logo-large.png"
              sx={{
                height: 'auto',
                width: '100px',
                cursor: 'pointer',
                objectFit: 'contain',
              }}
            />
          </IconButton>

          {/* Navigation Tabs */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  opacity: location.pathname === item.path ? 1 : 0.7,
                  '&:hover': {
                    opacity: 1,
                    background: 'none'
                  },
                  transition: 'opacity 0.2s ease-in-out'
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: { xs: 7, sm: 7, md: 7 } }}>
          {showSearch ? (
            <SearchBar onClose={() => setShowSearch(false)} />
          ) : (
            <IconButton
              onClick={() => setShowSearch(true)}
              sx={{ color: 'white' }}
            >
              <SearchIcon />
            </IconButton>
          )}
          
          <IconButton sx={{ color: 'white' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ p: 0 }}>
            <Avatar
              alt="Profile"
              src="/profile-avatar.png"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}; 