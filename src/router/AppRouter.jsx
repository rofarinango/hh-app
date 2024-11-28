import { Route, Routes } from "react-router-dom"
import { HomeRoutes } from "../hh/routes"

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
