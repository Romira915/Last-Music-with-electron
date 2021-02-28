import { combineReducers } from 'redux';
import audioPlayerSettingsSlice from './settings/audioPlayerSettingsSlice';
import generalSettingSlice from './settings/generalSettingsSlice';

export const settingsReducers = combineReducers({
    generalSettings: generalSettingSlice.reducer,
    audioPlayerSettings: audioPlayerSettingsSlice.reducer,
});
