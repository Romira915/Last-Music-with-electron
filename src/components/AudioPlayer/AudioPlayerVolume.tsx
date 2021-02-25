import React, { useMemo, useCallback, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    IconButton,
    Slider,
    Tooltip,
    Typography,
} from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import RepeatIcon from '@material-ui/icons/Repeat';
import {
    StyleAudioPlayerVolumeGroup,
    StyleAudioVolumeBar,
} from '../../styles/style';

interface Props {
    volumeValue: number;
    onSliderChange: (value: number) => void;
}

const AudioPlayerVolume: React.FC<Props> = props => {
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

    return (
        <StyleAudioPlayerVolumeGroup>
            <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={0}
                direction={'row'}>
                <Grid item>
                    <Tooltip title="Mute">
                        <IconButton>
                            <VolumeUpIcon fontSize={'small'} />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <StyleAudioVolumeBar>
                        <Slider
                            value={
                                isChanging
                                    ? sliderOnChangingValue
                                    : props.volumeValue
                            }
                            defaultValue={1}
                            aria-label={'MusicVolume'}
                            aria-labelledby="MusicVolume"
                            step={0.0001}
                            min={0}
                            max={1}
                            onChange={handleSliderChange}
                            onChangeCommitted={() => setIsChanging(false)}
                        />
                    </StyleAudioVolumeBar>
                </Grid>
            </Grid>
        </StyleAudioPlayerVolumeGroup>
    );
};

export default AudioPlayerVolume;
