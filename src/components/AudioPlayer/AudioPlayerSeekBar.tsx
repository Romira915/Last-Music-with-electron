import React, { useMemo, useCallback, useState } from 'react';
import { Box, Container, Grid, Slider, Typography } from '@material-ui/core';
import { StyleAudioPlayerSeekBarGroup } from '../../styles/style';

const minutesAndSecondsFromSeconds = (sec: number) => {
    return Math.floor(sec / 60) + ':' + ('00' + Math.floor(sec % 60)).slice(-2);
};

interface Props {
    currentTime: number;
    duration: number;
    title: string;
    onSliderChange: (value: number) => void;
    onSliderChangeCommitted: (value: number) => void;
}

const AudioPlayerSeekBar: React.FC<Props> = props => {
    const [isChanging, setIsChanging] = useState(false);
    const [sliderOnChangingValue, setSliderOnChangingValue] = useState(0);
    const handleSliderChange = useCallback(
        (event: React.ChangeEvent<{}>, value: number | number[]) => {
            if (typeof value === 'number') {
                setIsChanging(true);
                props.onSliderChange(value);
                setSliderOnChangingValue(value);
            }
        },
        [props.onSliderChange],
    );
    const handleSliderChangeCommitted = useCallback(
        (event: React.ChangeEvent<{}>, value: number | number[]) => {
            if (typeof value === 'number') {
                setIsChanging(false);
                props.onSliderChangeCommitted(value);
            }
        },
        [props.onSliderChangeCommitted],
    );

    return (
        <StyleAudioPlayerSeekBarGroup>
            <Grid container direction={'column'}>
                <Grid item>
                    <Grid
                        container
                        direction={'row'}
                        justify={'space-between'}
                        spacing={1}>
                        <Grid item>
                            <Typography id="MusicTitle">
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography id="MusicProgress">
                                {minutesAndSecondsFromSeconds(
                                    props.currentTime,
                                )}
                                /{minutesAndSecondsFromSeconds(props.duration)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Slider
                        defaultValue={0}
                        value={
                            isChanging
                                ? sliderOnChangingValue
                                : props.currentTime
                        }
                        max={props.duration}
                        step={0.0001}
                        onChange={handleSliderChange}
                        onChangeCommitted={handleSliderChangeCommitted}
                        aria-label={'MusicProgressBar'}
                        aria-labelledby="MusicProgressBar"
                    />
                </Grid>
            </Grid>
        </StyleAudioPlayerSeekBarGroup>
    );
};

export default AudioPlayerSeekBar;
