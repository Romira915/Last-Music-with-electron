import React, { useMemo, useCallback } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import PauseButton from './StopButton';
import PlayButton from './PlayButton';
import SkipNextButton from './SkipNextButton';
import SkipPreviousButton from './SkipPreviousButton';
import {
    StyleMediaControlPrimaryButtonGroup,
} from '../styles/style';

const MediaControlPrimaryButtonGroup: React.FC = () => {
    return (
        <StyleMediaControlPrimaryButtonGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <PlayButton />
                </Grid>
                <Grid item>
                    <PauseButton />
                </Grid>
                <Grid item>
                    <SkipPreviousButton />
                </Grid>
                <Grid item>
                    <SkipNextButton />
                </Grid>
            </Grid>
        </StyleMediaControlPrimaryButtonGroup>
    );
};

export default MediaControlPrimaryButtonGroup;
