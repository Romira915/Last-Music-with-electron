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
import {
    StyleAudioPlayerVolumeGroup,
    StyleAudioVolumeBar,
} from '../../styles/style';
import MuteButton from './MuteButton';

interface Props {
    onMuteClick?: () => void;
    isMuted: boolean;
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
                if (props.isMuted) {
                    props.onMuteClick();
                }
            }
        },
        [props.isMuted, props.onSliderChange, props.onMuteClick],
    );

    const volumeLevel: 0 | 1 | 2 = useMemo(() => {
        let value: 0 | 1 | 2 = 2;
        if (props.volumeValue > 0.5) {
            value = 2;
        } else if (props.volumeValue > 0) {
            value = 1;
        } else {
            value = 0;
        }
        return value;
    }, [props.volumeValue]);

    const sliderValue = useMemo(() => {
        let value = 1;
        if (isChanging) {
            value = sliderOnChangingValue;
        } else if (props.isMuted) {
            value = 0;
        } else {
            value = props.volumeValue;
        }
        return value;
    }, [isChanging, sliderOnChangingValue, props.isMuted, props.volumeValue]);

    return (
        <StyleAudioPlayerVolumeGroup>
            <Grid
                container
                justify={'flex-start'}
                alignItems={'center'}
                spacing={0}
                direction={'row'}>
                <Grid item>
                    <MuteButton
                        isMuted={props.isMuted}
                        volumeLevel={volumeLevel}
                        onClick={props.onMuteClick}
                    />
                </Grid>
                <Grid item>
                    <StyleAudioVolumeBar>
                        <Slider
                            value={sliderValue}
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
