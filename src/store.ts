import { combineReducers, createStore } from 'redux';
import {
    configureStore,
    createSlice,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import generalSettingSlice from './slice/settings/generalSettingsSlice';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import { settingsReducers } from './slice/settings';
import audioPlayerSettingsSlice from './slice/settings/audioPlayerSettingsSlice';

const persistConfig = {
    key: 'persist',
    version: 0.1,
    storage,
    blacklist: [],
};

// 複数の reducer を束ねる
const rootReducer = combineReducers({
    // --(a)
    settings: settingsReducers,
    // reducer が増えたら足していく
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const middlewareList = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    logger,
];

// グローバルオブジェクトとして、store を作成する。
const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewareList,
});

export let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// import store from './Store' とアクセスできるように default として定義する
export default store;
