import { Route, Routes } from "react-router-dom"
import { HomeRoutes } from "../home/routes"

export const AppRouter = () => {
  return (
    <Routes>
        <Route
            path="/*"
            element={<HomeRoutes/>}
        />
    </Routes>
  )
}
