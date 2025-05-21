import React, { useState } from 'react';
import {
    Typography,
    TextField,
    Button,
    List,
    Paper,
    Box,
    Fade,
    Checkbox,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    addTask,
    removeTask,
    toggleTask,
    editTask
} from '../store/taskSlice';
import type {Task} from '../store/taskSlice'

const Todo: React.FC = () => {
    const [newTask, setNewTask] = useState('');
    const [editing, setEditing] = useState<{ id: string; title: string } | null>(null);

    const tasks = useAppSelector((state) => state.tasks.items);
    const dispatch = useAppDispatch();

    const handleAdd = () => {
        if (!newTask.trim()) return;
        dispatch(addTask(newTask.trim()));
        setNewTask('');
    };
    return (
        <Paper elevation={5} sx={{ p: 5, borderRadius: 4 }}>
            <Typography variant="h3" align="center" sx={{ fontWeight: 700, mb: 4 }}>
                To-Do List
            </Typography>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                }}
                sx={{ display: 'flex', gap: 2, mb: 4 }}
            >
                <TextField
                    fullWidth
                    label="Add a task..."
                    variant="outlined"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button type="submit" variant="contained" size="large" sx={{ px: 4 }}>
                    Add
                </Button>
            </Box>
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {tasks.map((task: Task) => {
                    const isEditing = editing?.id === task.id;
                    return (
                        <Fade in key={task.id}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={() => dispatch(toggleTask(task.id))}
                                    />
                                    {isEditing ? (
                                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                value={editing.title}
                                                autoFocus
                                                onChange={(e) =>
                                                    setEditing({ ...editing, title: e.target.value })
                                                }
                                            />
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        if (editing.title.trim()) {
                                                            dispatch(editTask(editing));
                                                            setEditing(null);
                                                        }
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => setEditing(null)}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                color: task.completed ? 'text.disabled' : 'text.primary',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            {task.title}
                                        </Typography>
                                    )}
                                </Box>
                                <Box>
                                    <IconButton onClick={() => setEditing({ id: task.id, title: task.title })}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => dispatch(removeTask(task.id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Fade>
                    );
                })}
            </List>

            {tasks.length === 0 && (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    You have no tasks. You're free!
                </Typography>
            )}
        </Paper>
    );
};

export default Todo;