import React, { useMemo, useCallback } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Slider,
    Typography,
} from '@material-ui/core';
import MediaControlPrimaryButtonGroup from './MediaControlPrimaryButtonGroup';
import MediaControlSeekBar from './MediaControlSeekBar';
import MediaControlVolume from './MediaControlVolume';
import MediaControlPlayOption from './MediaControlPlayOption';
import { StyleMediaControlPanel } from '../styles/style';

const MediaControlPanel: React.FC = () => {
    return (
        <Paper>
            <StyleMediaControlPanel>
                <MediaControlPrimaryButtonGroup />
                <MediaControlSeekBar />
                <MediaControlVolume />
                <MediaControlPlayOption />
            </StyleMediaControlPanel>
        </Paper>
    );
};

export default MediaControlPanel;
