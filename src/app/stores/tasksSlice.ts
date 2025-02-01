import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TasksState {
  tasks: Record<number, Task>;
}

const initialState: TasksState = {
  tasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // 할 일 목록 조회
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return {
        ...state,
        tasks: action.payload.reduce(
          (acc, task) => {
            acc[task.id] = task;
            return acc;
          },
          {} as Record<number, Task>,
        ),
      };
    },

    // 할 일 추가
    addTask: (state, action: PayloadAction<Task>) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: action.payload,
        },
      };
    },

    // 할 일 수정
    updateTask: (state, action: PayloadAction<Task>) => {
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.payload.id]: action.payload,
        },
      };
    },

    // 할 일 삭제
    deleteTask: (state, action: PayloadAction<number>) => {
      const newTasks = { ...state.tasks };
      delete newTasks[action.payload];
      return {
        ...state,
        tasks: newTasks,
      };
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
