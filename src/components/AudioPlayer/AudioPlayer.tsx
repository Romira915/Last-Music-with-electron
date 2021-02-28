import React, { useMemo, useCallback, useState } from 'react';
import AudioPlayerPrimaryButtonGroup from './AudioPlayerPrimaryButtonGroup';
import AudioPlayerSeekBar from './AudioPlayerSeekBar';
import AudioPlayerVolume from './AudioPlayerVolume';
import AudioPlayerPlayOption from './AudioPlayerPlayOption';
import { StyleAudioPlayerPanel } from '../../styles/style';
import AudioController, { AudioStatus } from './audioController';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import {
    AudioPlayerSettings,
    setMuted,
    setVolume,
} from '../../slice/settings/audioPlayerSettingsSlice';

const media = [
    '../01 Fight oh! MIRAI oh!.flac',
    '../01 Aile To Yell.mp3',
    '../02 シャンランラン.mp4',
];
const audioController = new AudioController(media);

interface Props {}

const AudioPlayerPanel: React.FC<Props> = props => {
    const dispatch = useAppDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState('');
    const [pauseBySeekberChange, setPauseBySeekberChange] = useState(false);
    audioController.settings = useSelector<RootState, AudioPlayerSettings>(
        state => state.settings.audioPlayerSettings,
    );
    const handlePlayClick = useCallback(() => {
        audioController.play();
    }, []);
    const handlePauseClick = useCallback(() => {
        audioController.pause();
    }, []);
    const handleStopClick = useCallback(() => {
        audioController.stop();
    }, []);
    const handleSeekbarChange = useCallback(
        (value: number) => {
            if (isPlaying) {
                handlePauseClick();
                setPauseBySeekberChange(true);
            }
        },
        [isPlaying],
    );
    const handleSeekbarChangeCommitted = useCallback(
        (value: number) => {
            audioController.currentTime = value;
            setCurrentTime(value);
            if (pauseBySeekberChange) {
                handlePlayClick();
                setPauseBySeekberChange(false);
            }
        },
        [pauseBySeekberChange],
    );

    audioController.onplay = useCallback(() => {
        setIsPlaying(true);
        setTitle(audioController.title);
    }, []);
    audioController.onpause = useCallback(() => setIsPlaying(false), []);
    audioController.onstop = useCallback(() => {
        setIsPlaying(false);
        setTitle('停止');
    }, []);
    audioController.ontimeupdate = useCallback(() => {
        setCurrentTime(audioController.currentTime);
    }, []);
    audioController.onloadedmetadata = useCallback(() => {
        setDuration(audioController.duration);
        setTitle(audioController.title);
    }, []);

    return (
        <StyleAudioPlayerPanel elevation={8} square>
            <AudioPlayerPrimaryButtonGroup
                onPlayClick={handlePlayClick}
                onPauseClick={handlePauseClick}
                onStopClick={handleStopClick}
                isPlaying={isPlaying}
            />
            <AudioPlayerSeekBar
                currentTime={currentTime}
                duration={duration}
                title={title}
                onSliderChange={handleSeekbarChange}
                onSliderChangeCommitted={handleSeekbarChangeCommitted}
            />
            <AudioPlayerVolume />
            <AudioPlayerPlayOption />
        </StyleAudioPlayerPanel>
    );
};

export default AudioPlayerPanel;
