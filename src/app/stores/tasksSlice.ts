import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TasksState {
  taskById: Record<number, Task>;
}

const initialState: TasksState = {
  taskById: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // 할 일 목록 조회
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.taskById = Object.fromEntries(
        action.payload.map((task) => [task.id, task]),
      );
    },

    // 할 일 추가
    addTask: (state, action: PayloadAction<Task>) => {
      state.taskById[action.payload.id] = action.payload;
    },

    // 할 일 수정
    updateTask: (state, action: PayloadAction<Task>) => {
      state.taskById[action.payload.id] = action.payload;
    },

    // 할 일 삭제
    deleteTask: (state, action: PayloadAction<number>) => {
      delete state.taskById[action.payload];
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
