import User from './user';
import Settings from './settings';

export interface State {
    user: User;
    settings: Settings;
    // state が増えたら ここに追加する。
}
