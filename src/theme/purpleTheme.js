import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: "#556cd6"
        },
        secondary: {
            main: "#19867B"
        },
        error: {
            main: red.A400
        }
    }
})