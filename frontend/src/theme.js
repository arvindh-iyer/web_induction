import { createTheme } from "@mui/material";
import {grey} from "@mui/material/colors";

export const theme=createTheme({
    palette:{
        primary:{main:'#FFFFFF'},
        secondary:grey
    }
})

export const darkTheme=createTheme({
    palette:{
        primary:grey,
        secondary:{main:'#FFFFFF'}
    }
})