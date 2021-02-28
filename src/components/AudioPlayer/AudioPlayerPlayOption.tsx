import React, { useMemo, useCallback } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { StyleAudioPlayerPlayOptionGroup } from '../../styles/style';
import { Repeat, Shuffle } from '@material-ui/icons';
import RepeatButton from './RepeatButton';
import ShuffleButton from './ShuffleButton';
import { RepeatMode } from './audioController';

interface Props {
    onRepeatClick?: () => void;
    onShuffleClick?: () => void;
}

const AudioPlayerPlayOption: React.FC<Props> = props => {
    return (
        <StyleAudioPlayerPlayOptionGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <RepeatButton
                        // TODO 後でプレイヤーと同期
                        repeatMode={RepeatMode.RepeatOff}
                        onClick={props.onRepeatClick}
                    />
                </Grid>
                <Grid item>
                    <ShuffleButton onClick={props.onShuffleClick} />
                </Grid>
            </Grid>
        </StyleAudioPlayerPlayOptionGroup>
    );
};

export default AudioPlayerPlayOption;
