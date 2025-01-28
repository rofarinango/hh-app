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
        },
        text: {
            primary: '#FFFFFF'
        },
        background: {
            default: '#141414'
        }
    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
      components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'white',
                    '&.Mui-focused': { color: 'white' },
                    '&.MuiFormLabel-filled': { color: 'white' },
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                MenuProps: {
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right", // Align menu to the right
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "right", // Align menu's origin to the right
                  },
                },
            },
            styleOverrides: {
                root: {
                backgroundColor: '#242424',
                color: "white",
                ".MuiSvgIcon-root": {
                        color: "white", // Dropdown icon color
                    },
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
              paper: {
                backgroundColor: "#242424", // Set the background color
                border: "none", // Remove any borders
                boxShadow: "none", // Remove box-shadow if present
              },
              
            },
          },
        MuiMenuItem: {
          styleOverrides: {
            root: {
                backgroundColor: '#242424',
                "&:hover": {
                    backgroundColor: '#424242',
                },
                
            },
          },
        },
      },
})