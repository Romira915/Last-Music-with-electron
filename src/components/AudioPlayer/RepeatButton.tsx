import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { RepeatMode } from './audioController';
import { Repeat, RepeatOne } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import {
    AudioPlayerSettings,
    setRepeatMode,
} from '../../slice/settings/audioPlayerSettingsSlice';
import { useAppDispatch, RootState } from '../../store';

interface Props {}

const RepeatButton: React.FC<Props> = props => {
    const dispatch = useAppDispatch();
    const { repeatMode } = useSelector<RootState, AudioPlayerSettings>(
        state => state.settings.audioPlayerSettings,
    );

    const [title, color, handleRepeatClick] = useMemo(() => {
        let title: string;
        let color: 'action' | 'disabled' = 'action';
        let handle: () => void;
        switch (repeatMode) {
            case RepeatMode.RepeatOff:
                title = 'Repeat all';
                handle = () => dispatch(setRepeatMode(RepeatMode.RepeatAll));
                color = 'disabled';
                break;
            case RepeatMode.RepeatAll:
                title = 'Repeat one';
                handle = () => dispatch(setRepeatMode(RepeatMode.RepeatOne));
                break;
            case RepeatMode.RepeatOne:
                title = 'Repeat off';
                handle = () => dispatch(setRepeatMode(RepeatMode.RepeatOff));
                break;
        }
        return [title, color, handle];
    }, [repeatMode]);

    return (
        <Tooltip title={title}>
            <IconButton edge={'end'} onClick={handleRepeatClick}>
                {repeatMode === RepeatMode.RepeatOne ? (
                    <RepeatOne color={color} />
                ) : (
                    <Repeat color={color} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default RepeatButton;
