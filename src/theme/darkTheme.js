import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#141414'
        },
        secondary: {
            main: '#564d4d'
        },
        error: {
            main: red.A400
        }
    }
})