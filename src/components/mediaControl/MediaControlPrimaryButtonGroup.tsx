import React, { useMemo, useCallback } from 'react';
import { Box, Card, CardMedia, Container, Grid } from '@material-ui/core';
import PlayButton from './PlayButton';
import SkipNextButton from './SkipNextButton';
import SkipPreviousButton from './SkipPreviousButton';
import { StyleMediaControlPrimaryButtonGroup } from '../../styles/style';
import {} from '../../api/apiInterface';
import { ContextReplacementPlugin } from 'webpack';
import StopButton from './StopButton';

interface Props {
    onPlayClick?: () => void;
    onStopClick?: () => void;
}

const MediaControlPrimaryButtonGroup: React.FC<Props> = props => {
    return (
        <StyleMediaControlPrimaryButtonGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    <PlayButton onClick={props.onPlayClick} />
                </Grid>
                <Grid item>
                    <StopButton onClick={props.onStopClick} />
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
