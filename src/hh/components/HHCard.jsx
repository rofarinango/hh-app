import React from 'react'
import { Card, CardMedia } from '@mui/material'

export const HHCard = ({ onClick }) => {
  return (
    <Card 
        onClick={onClick}
        sx={{
            height: 200,
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
            sx={{ objectFit: 'fit' }}
        />
    </Card>
  )
}
