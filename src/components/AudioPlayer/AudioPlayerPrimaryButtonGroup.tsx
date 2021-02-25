import React, { useMemo, useCallback } from 'react';
import { Box, Card, CardMedia, Container, Grid } from '@material-ui/core';
import PlayButton from './PlayButton';
import SkipNextButton from './SkipNextButton';
import SkipPreviousButton from './SkipPreviousButton';
import { StyleAudioPlayerPrimaryButtonGroup } from '../../styles/style';
import {} from '../../api/apiInterface';
import { ContextReplacementPlugin } from 'webpack';
import StopButton from './StopButton';
import PauseButton from './PauseButton';

interface Props {
    onPlayClick?: () => void;
    onStopClick?: () => void;
    onPauseClick?: () => void;
    onSkipPreviousClick?: () => void;
    onSkipNextClick?: () => void;

    isPlaying: boolean;
}

const AudioPlayerPrimaryButtonGroup: React.FC<Props> = props => {
    return (
        <StyleAudioPlayerPrimaryButtonGroup>
            <Grid container direction={'row'} alignItems={'center'}>
                <Grid item>
                    {props.isPlaying ? (
                        <PauseButton onClick={props.onPauseClick} />
                    ) : (
                        <PlayButton onClick={props.onPlayClick} />
                    )}
                </Grid>
                <Grid item>
                    <StopButton onClick={props.onStopClick} />
                </Grid>
                <Grid item>
                    <SkipPreviousButton onClick={props.onSkipPreviousClick} />
                </Grid>
                <Grid item>
                    <SkipNextButton onClick={props.onSkipNextClick} />
                </Grid>
            </Grid>
        </StyleAudioPlayerPrimaryButtonGroup>
    );
};

export default AudioPlayerPrimaryButtonGroup;
