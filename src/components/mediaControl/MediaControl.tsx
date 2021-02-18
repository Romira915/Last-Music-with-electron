import React, { useMemo, useCallback } from 'react';
import MediaControlPrimaryButtonGroup from './MediaControlPrimaryButtonGroup';
import MediaControlSeekBar from './MediaControlSeekBar';
import MediaControlVolume from './MediaControlVolume';
import MediaControlPlayOption from './MediaControlPlayOption';
import { StyleMediaControlPanel } from '../../styles/style';
import MusicPlayer from './musicPlayer';

const media =
    'C:\\Users\\Yudai\\workspace\\Project\\Last-Music\\01 Fight oh! MIRAI oh!.flac';
const musicPlayer = new MusicPlayer([media]);

interface Props {}

const MediaControlPanel: React.FC<Props> = props => {
    musicPlayer.volume = 0.1;

    const onPlay = () => {
        musicPlayer.play();
    };
    const onStop = () => {
        musicPlayer.stop();
    };

    return (
        <StyleMediaControlPanel elevation={8} square>
            <MediaControlPrimaryButtonGroup
                onPlayClick={onPlay}
                onStopClick={onStop}
            />
            <MediaControlSeekBar />
            <MediaControlVolume />
            <MediaControlPlayOption />
        </StyleMediaControlPanel>
    );
};

export default MediaControlPanel;
