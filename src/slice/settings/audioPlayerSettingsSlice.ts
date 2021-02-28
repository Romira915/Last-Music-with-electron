import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    RepeatMode,
    ShuffleMode,
} from '../../components/AudioPlayer/audioController';

export interface AudioPlayerSettings {
    volume: number;
    isMuted: boolean;
    repeatMode: RepeatMode;
    shuffleMode: ShuffleMode;
}

const initAudioPlayerSettingsState: AudioPlayerSettings = {
    volume: 1,
    isMuted: false,
    repeatMode: RepeatMode.RepeatOff,
    shuffleMode: ShuffleMode.ShuffleOff,
};

const audioPlayerSettingsSlice = createSlice({
    name: 'audioPlayerSettings',
    initialState: initAudioPlayerSettingsState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setMuted: (state, action: PayloadAction<boolean>) => {
            state.isMuted = action.payload;
        },
        setRepeatMode: (state, action: PayloadAction<RepeatMode>) => {
            state.repeatMode = action.payload;
        },
        setShuffleMode: (state, action: PayloadAction<ShuffleMode>) => {
            state.shuffleMode = action.payload;
        },
    },
});

export const {
    setVolume,
    setMuted,
    setRepeatMode,
    setShuffleMode,
} = audioPlayerSettingsSlice.actions;

export default audioPlayerSettingsSlice;
