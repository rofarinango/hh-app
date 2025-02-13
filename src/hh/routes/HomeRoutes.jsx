import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage, EpisodePage, SearchPage } from '../pages'

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
          path="/search"
          element={<SearchPage />}
        />
        <Route
          path='/*'
          element={<Navigate to='/'/>}
        />
        
      </Routes>
    )
}
