'use client';

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import authReducer from '@/app/stores/auth/authSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import tasksReducer from '@/app/stores/tasksSlice';
import oauthReducer from '@/app/stores/oauthSlice';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('session');
// Persist 설정 간소화
const rootPersistConfig = {
  key: 'root',
  storage,
  // 특정 리듀서만 영구 저장
  whitelist: ['auth', 'oauth'],
};

// 리듀서 결합
const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer, // tasksReducer 추가
  oauth: oauthReducer, // OAuth 리듀서 추가
});

// Persist 리듀서 생성
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// 스토어 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
