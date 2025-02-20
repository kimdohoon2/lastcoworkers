import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './tasksStore';

const selectTasksArray = createSelector(
  (state: RootState) => state.tasks.taskById,
  (tasks) => Object.values(tasks),
);

export default selectTasksArray;
