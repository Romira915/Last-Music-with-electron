import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeEnum } from '../theme/Theme';

// export const Theme = {
//     Light: 'Light',
//     Dark: 'Dark',
// } as const;

// // 以下は type Card = "clubs" | "diamonds" | "hearts" | "spades" と同じ
// type Theme = typeof Theme[keyof typeof Theme];

export interface Settings {
    theme: ThemeEnum;
    count: string[];
}

const initSettingsState: Settings = {
    theme: ThemeEnum.dark,
    count: [],
};

const settingSlice = createSlice({
    name: 'settings',
    initialState: initSettingsState,
    reducers: {
        changeTheme: (state, action: PayloadAction<ThemeEnum>) => {
            state.theme = action.payload;
        },
        counter: (state, action: PayloadAction<undefined>) => {
            state.count.push('counter');
        },
    },
});

export const { changeTheme, counter } = settingSlice.actions;

export default settingSlice;
