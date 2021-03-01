import React, { useMemo, useCallback } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import { useSelector } from 'react-redux';
import {
    AudioPlayerSettings,
    setShuffleMode,
} from '../../slice/settings/audioPlayerSettingsSlice';
import { useAppDispatch, RootState } from '../../store';
import { ShuffleMode } from './audioController';

interface Props {}

const ShuffleButton: React.FC<Props> = props => {
    const dispatch = useAppDispatch();
    const { shuffleMode } = useSelector<RootState, AudioPlayerSettings>(
        state => state.settings.audioPlayerSettings,
    );

    const [title, color, handleShuffleClick] = useMemo(() => {
        let title: string = '';
        let color: 'action' | 'disabled' = 'action';
        let handle: () => void = () => {};
        switch (shuffleMode) {
            case ShuffleMode.ShuffleOff:
                title = 'Shuffle on';
                handle = () => dispatch(setShuffleMode(ShuffleMode.ShuffleOn));
                color = 'disabled';
                break;
            case ShuffleMode.ShuffleOn:
                title = 'Shuffle off';
                handle = () => dispatch(setShuffleMode(ShuffleMode.ShuffleOff));
                color = 'action';
                break;
        }
        return [title, color, handle];
    }, [shuffleMode]);

    return (
        <Tooltip title={title}>
            <IconButton onClick={handleShuffleClick}>
                <ShuffleIcon color={color} />
            </IconButton>
        </Tooltip>
    );
};

export default ShuffleButton;
