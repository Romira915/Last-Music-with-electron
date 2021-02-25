import React, { useMemo, useCallback } from 'react';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { StyleAudioPlayerPlayOptionGroup } from '../../styles/style';
import { Repeat, Shuffle } from '@material-ui/icons';
import RepeatButton from './RepeatButton';
import ShuffleButton from './ShuffleButton';

const AudioPlayerPlayOption: React.FC = () => {
    return (
        <StyleAudioPlayerPlayOptionGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <RepeatButton />
                </Grid>
                <Grid item>
                    <ShuffleButton />
                </Grid>
            </Grid>
        </StyleAudioPlayerPlayOptionGroup>
    );
};

export default AudioPlayerPlayOption;
