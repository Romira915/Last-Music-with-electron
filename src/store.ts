import { combineReducers, createStore } from 'redux';
import {
    configureStore,
    createSlice,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import settingSlice from './slice/settingsSlice';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';

// 複数の reducer を束ねる
const rootReducer = combineReducers({
    // --(a)
    settings: settingSlice.reducer,
    // reducer が増えたら足していく
});

export type RootState = ReturnType<typeof rootReducer>;

const middlewareList = [
    ...getDefaultMiddleware({ serializableCheck: true }),
    logger,
];

// グローバルオブジェクトとして、store を作成する。
const store = configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// import store from './Store' とアクセスできるように default として定義する
export default store;
