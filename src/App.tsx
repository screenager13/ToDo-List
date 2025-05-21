import React from 'react';
import { Box, Container } from '@mui/material';
import Todo from './components/TodoList';

const App: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'background.default',
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Todo />
            </Container>
        </Box>
    );
};

export default App;
