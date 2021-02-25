import React, { useMemo, useCallback, useState } from 'react';
import AudioPlayerPrimaryButtonGroup from './AudioPlayerPrimaryButtonGroup';
import AudioPlayerSeekBar from './AudioPlayerSeekBar';
import AudioPlayerVolume from './AudioPlayerVolume';
import AudioPlayerPlayOption from './AudioPlayerPlayOption';
import { StyleAudioPlayerPanel } from '../../styles/style';
import AudioController, { AudioStatus } from './audioController';

const media =
    'C:\\Users\\Yudai\\workspace\\Project\\Last-Music\\01 Fight oh! MIRAI oh!.flac';
const audioController = new AudioController([media]);

interface Props {}

const AudioPlayerPanel: React.FC<Props> = props => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [title, setTitle] = useState('');
    const [pauseBySliderChange, setPauseBySliderChange] = useState(false);
    const play = useCallback(() => {
        audioController.play();
    }, []);
    const pause = useCallback(() => {
        audioController.pause();
    }, []);
    const stop = useCallback(() => {
        audioController.stop();
    }, []);
    const handleSliderChange = useCallback(
        (value: number) => {
            if (isPlaying) {
                pause();
                setPauseBySliderChange(true);
            }
        },
        [isPlaying],
    );
    const handleSliderChangeCommitted = useCallback(
        (value: number) => {
            audioController.currentTime = value;
            setCurrentTime(value);
            if (pauseBySliderChange) {
                play();
                setPauseBySliderChange(false);
            }
        },
        [pauseBySliderChange],
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

    audioController.volume = 0.08;

    return (
        <StyleAudioPlayerPanel elevation={8} square>
            <AudioPlayerPrimaryButtonGroup
                onPlayClick={play}
                onPauseClick={pause}
                onStopClick={stop}
                isPlaying={isPlaying}
            />
            <AudioPlayerSeekBar
                currentTime={currentTime}
                duration={duration}
                title={title}
                onSliderChange={handleSliderChange}
                onSliderChangeCommitted={handleSliderChangeCommitted}
            />
            <AudioPlayerVolume />
            <AudioPlayerPlayOption />
        </StyleAudioPlayerPanel>
    );
};

export default AudioPlayerPanel;
