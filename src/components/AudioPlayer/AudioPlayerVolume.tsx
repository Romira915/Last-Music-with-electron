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
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
    AudioPlayerSettings,
    setMuted,
    setVolume,
} from '../../slice/settings/audioPlayerSettingsSlice';

interface Props {}

const AudioPlayerVolume: React.FC<Props> = props => {
    const dispatch = useAppDispatch();
    const { volume, isMuted } = useSelector<RootState, AudioPlayerSettings>(
        state => state.settings.audioPlayerSettings,
    );
    const [isChanging, setIsChanging] = useState(false);
    const [sliderOnChangingValue, setSliderOnChangingValue] = useState(0);
    const handleMuteClick = useCallback(() => {
        dispatch(setMuted(!isMuted));
    }, [isMuted]);
    const handleSliderChange = useCallback(
        (event: React.ChangeEvent<{}>, value: number | number[]) => {
            if (typeof value === 'number') {
                setIsChanging(true);
                dispatch(setVolume(value));
                setSliderOnChangingValue(value);
                if (isMuted) {
                    handleMuteClick();
                }
            }
        },
        [isMuted],
    );
    const handleSliderChangeCommitted = useCallback(
        (event: React.ChangeEvent<{}>, value: number | number[]) => {
            if (typeof value === 'number') {
                setIsChanging(false);
            }
        },
        [],
    );

    const volumeLevel: 0 | 1 | 2 = useMemo(() => {
        let value: 0 | 1 | 2 = 2;
        if (volume > 0.5) {
            value = 2;
        } else if (volume > 0) {
            value = 1;
        } else {
            value = 0;
        }
        return value;
    }, [volume]);

    const sliderValue = useMemo(() => {
        let value = 1;
        if (isChanging) {
            // Give priority to user operations.
            value = sliderOnChangingValue;
        } else if (isMuted) {
            // Set to 0 for display only when muted. (Do not change the volume of audio.)
            value = 0;
        } else {
            value = volume;
        }
        return value;
    }, [isChanging, sliderOnChangingValue, isMuted, volume]);

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
                        isMuted={isMuted}
                        volumeLevel={volumeLevel}
                        onClick={handleMuteClick}
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
                            onChangeCommitted={handleSliderChangeCommitted}
                        />
                    </StyleAudioVolumeBar>
                </Grid>
            </Grid>
        </StyleAudioPlayerVolumeGroup>
    );
};

export default AudioPlayerVolume;
