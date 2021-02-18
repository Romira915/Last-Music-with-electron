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
    StyleMediaControlVolumeGroup,
    StyleMediaVolumeBar,
} from '../../styles/style';

const MediaControlVolume: React.FC = () => {
    return (
        <StyleMediaControlVolumeGroup>
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
                    <StyleMediaVolumeBar>
                        <Slider
                            defaultValue={100}
                            aria-label={'MusicVolume'}
                            aria-labelledby="MusicVolume"
                            step={0.001}
                            min={0}
                            max={1}
                        />
                    </StyleMediaVolumeBar>
                </Grid>
            </Grid>
        </StyleMediaControlVolumeGroup>
    );
};

export default MediaControlVolume;
