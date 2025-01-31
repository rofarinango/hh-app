
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage, EpisodePage } from '../pages'

export const HomeRoutes = () => {
  return (
    
      <Routes>
        <Route
          path='/'
          element={<HomePage/>}
        />
        <Route 
          path="/watch/:episodeId" 
          element={<EpisodePage />} 
        />
        <Route
          path='/*'
          element={<Navigate to='/'/>}
        />
        
      </Routes>
    )
}
