import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import pageReducer from './slices/pageSlice';
import timerReducer from './slices/timerSlice';
import toastReducer from './slices/toastSlice';

// auth 슬라이스만 영구 저장되도록 설정
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

// 모든 슬라이스 리듀서를 통합
const rootReducer = combineReducers({
  auth: authReducer,
  page: pageReducer,
  timer: timerReducer,
  toast: toastReducer,
});

// persist 적용된 루트 리듀서를 스토어에 설정
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성 및 미들웨어 설정
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
