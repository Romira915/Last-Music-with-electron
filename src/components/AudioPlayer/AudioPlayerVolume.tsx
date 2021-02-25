import React, { useMemo, useCallback } from 'react';
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

const AudioPlayerVolume: React.FC = () => {
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
                            defaultValue={100}
                            aria-label={'MusicVolume'}
                            aria-labelledby="MusicVolume"
                            step={0.001}
                            min={0}
                            max={1}
                        />
                    </StyleAudioVolumeBar>
                </Grid>
            </Grid>
        </StyleAudioPlayerVolumeGroup>
    );
};

export default AudioPlayerVolume;
