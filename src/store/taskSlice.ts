import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
}
interface TaskState {
    items: Task[];
}
const initialState: TaskState = {
    items: []
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<string>) {
            state.items.push({
                id: crypto.randomUUID(),
                title: action.payload,
                completed: false
            });
        },
        toggleTask(state, action: PayloadAction<string>) {
            const task = state.items.find(tasks => tasks.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        removeTask(state, action: PayloadAction<string>) {
            state.items = state.items.filter(task => task.id !== action.payload);
        },
        editTask(state, action: PayloadAction<{ id:string; title:string }>) {
            const task = state.items.find(tasks => tasks.id === action.payload.id);
            if (task) {
                task.title = action.payload.title;
            }
        }
    }
});
export const {addTask, toggleTask, removeTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;