import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#a259ff",
        },
        secondary: {
            main: "#2c2c54",
        },
        background: {
            default: "#1a1a1a",
            paper: "#2b2b2b",
        },
        text: {
            primary: "#f2f2f2",
            secondary: "#c7b9ff",
        },
    },
});


export default theme;
