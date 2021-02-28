import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { ThemeEnum } from '../../theme/Theme';
import audioPlayerSettingsSlice from './audioPlayerSettingsSlice';

// export const Theme = {
//     Light: 'Light',
//     Dark: 'Dark',
// } as const;

// // 以下は type Card = "clubs" | "diamonds" | "hearts" | "spades" と同じ
// type Theme = typeof Theme[keyof typeof Theme];

export interface GeneralSettings {
    theme: ThemeEnum;
}

const initSettingsState: GeneralSettings = {
    theme: ThemeEnum.Dark,
};

const generalSettingSlice = createSlice({
    name: 'settings',
    initialState: initSettingsState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeEnum>) => {
            state.theme = action.payload;
        },
    },
});

export const { changeTheme } = generalSettingSlice.actions;

export default generalSettingSlice;
