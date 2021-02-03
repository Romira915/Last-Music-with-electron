import { combineReducers, createStore } from 'redux';
import { State } from './states/state';
import userReducer from './reducers/UserReducer';
import settingsReducer from './reducers/SettingsReducer';

// 複数の reducer を束ねる
const combinedReducer = combineReducers<State>({
    // --(a)
    user: userReducer,
    settings: settingsReducer,
    // reducer が増えたら足していく
});

// グローバルオブジェクトとして、store を作成する。
export const store = createStore(combinedReducer); // --(b)

// import store from './Store' とアクセスできるように default として定義する
export default store;
