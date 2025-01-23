import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 로컬 스토리지 사용
import { combineReducers } from 'redux';
import authReducer, { setCredentials } from '@/app/stores/auth/authSlice'; // setCredentials import

// Redux Persist 설정
const persistConfig = {
  key: 'root', // 스토리지에 저장될 키
  storage,
};

// 루트 리듀서 생성
const rootReducer = combineReducers({
  auth: authReducer, // auth 상태를 관리
});

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux 스토어 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 관련 경고 방지
    }),
});

// Redux Persist 객체 생성
const persistor = persistStore(store);

// 로컬스토리지에서 초기값을 읽어 Redux에 설정
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

// 초기 상태 설정
if (accessToken && refreshToken && user) {
  store.dispatch(setCredentials({ accessToken, refreshToken, user }));
}

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
