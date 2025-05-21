import React from "react";
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import App from './App.tsx'
import {store, persistor} from "./store/store.ts";
import {CssBaseline} from "@mui/material";
import {ThemeProvider} from "@mui/material";
import theme from "./style/ColorTheme.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
