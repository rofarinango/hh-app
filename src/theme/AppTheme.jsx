import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { darkTheme } from "./"

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline>
            {children}
        </CssBaseline>
    </ThemeProvider>
  )
}
