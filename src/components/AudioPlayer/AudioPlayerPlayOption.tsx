import React, { useMemo, useCallback } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { StyleAudioPlayerPlayOptionGroup } from '../../styles/style';
import { Repeat, Shuffle } from '@material-ui/icons';
import RepeatButton from './RepeatButton';
import ShuffleButton from './ShuffleButton';
import { RepeatMode } from './audioController';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { AudioPlayerSettings } from '../../slice/settings/audioPlayerSettingsSlice';

interface Props {}

const AudioPlayerPlayOption: React.FC<Props> = props => {
    return (
        <StyleAudioPlayerPlayOptionGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <RepeatButton
                    // doneTODO 後でプレイヤーと同期
                    />
                </Grid>
                <Grid item>
                    <ShuffleButton />
                </Grid>
            </Grid>
        </StyleAudioPlayerPlayOptionGroup>
    );
};

export default AudioPlayerPlayOption;
