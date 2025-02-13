import { AppTheme } from "./theme"
import { AppRouter } from "./router"
import { SearchPage } from './hh/pages/SearchPage';


export const HHApp = () => {
  return (
    <AppTheme>
        <AppRouter/>
    </AppTheme>
  )
}
