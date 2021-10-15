import { ThreeSixtyOutlined } from '@material-ui/icons';
import { AudioPlayerSettings } from '../../slice/settings/audioPlayerSettingsSlice';
import * as musicMetadata from 'music-metadata-browser';

export const AudioStatus = {
    Playing: 'Playing',
    Paused: 'Paused',
    Stopped: 'Stopped',
    Ready: 'Ready',
    Stalled: 'Stalled',
    Waiting: 'Waiting',
    Unknown: 'Unknown',
};

export type AudioStatus = typeof AudioStatus[keyof typeof AudioStatus];

export const RepeatMode = {
    RepeatOff: 'RepeatOff',
    RepeatOne: 'RepeatOne',
    RepeatAll: 'RepeatAll',
};

export type RepeatMode = typeof RepeatMode[keyof typeof RepeatMode];

export const ShuffleMode = {
    ShuffleOff: 'ShuffleOff',
    ShuffleOn: 'ShuffleOn',
};

export type ShuffleMode = typeof ShuffleMode[keyof typeof ShuffleMode];

class AudioController {
    private audioContext: AudioContext;
    private audioElement: HTMLAudioElement;
    private sourceNode: MediaElementAudioSourceNode;
    private gainNode: GainNode;
    private destinationNode: MediaStreamAudioDestinationNode;
    private outputAudioElement: HTMLAudioElement;
    private playingList: string[];
    private currentOutputAudioDevice: MediaDeviceInfo | null;
    private audioStatus: AudioStatus;
    private handleAudioOnstop: () => void;
    private currentAudioIndex: number;
    public repeatMode: RepeatMode;
    public shuffleMode: ShuffleMode;

    // TODO null errorが起こる
    public constructor(playingList: string[] = []) {
        this.playingList = playingList;
        this.currentAudioIndex = this.playingList.length === 0 ? -1 : 0;

        this.audioStatus = AudioStatus.Unknown;
        this.currentOutputAudioDevice = null;
        this.handleAudioOnstop = () => {};
        this.repeatMode = RepeatMode.RepeatOff;
        this.shuffleMode = ShuffleMode.ShuffleOff;

        this.audioContext = new AudioContext();
        this.audioElement = new Audio(this.playingList[0]);
        this.sourceNode = this.audioContext.createMediaElementSource(
            this.audioElement,
        );
        this.gainNode = this.audioContext.createGain();
        this.destinationNode = this.audioContext.createMediaStreamDestination();
        this.outputAudioElement = new Audio();

        this.sourceNode.connect(this.gainNode);
        this.gainNode.connect(this.destinationNode);
        this.outputAudioElement.srcObject = this.destinationNode.stream;

        this.audioElement.oncanplay = () => {
            console.log('oncanplay');
            this.audioStatus = AudioStatus.Ready;
        };
        this.audioElement.onwaiting = () => {
            console.log('onwaiting');
            this.audioStatus = AudioStatus.Waiting;
        };
        this.audioElement.onstalled = () => {
            console.log('onstalled');
            this.audioStatus = AudioStatus.Stalled;
        };
        this.audioElement.onended = (ev: Event) => {
            console.log('onended');
            // TODO エンド処理の実装
            if (this.repeatMode === RepeatMode.RepeatOne) {
                this.play();
            } else if (this.shuffleMode === ShuffleMode.ShuffleOn) {
                this.audioElement.src = this.playingList[
                    Math.floor(Math.random() * this.playingList.length)
                ];
            } else if (
                this.repeatMode === RepeatMode.RepeatAll &&
                this.playingList.length - 1 === this.currentAudioIndex
            ) {
                this.toFirst();
            } else {
                this.toNext();
            }

            this.audioElement.autoplay = true;
        };
    }

    public play() {
        this.audioElement.play();
        this.outputAudioElement.play();
    }

    public pause() {
        this.audioElement.pause();
        this.outputAudioElement.pause();
    }

    public stop() {
        this.pause();
        this.audioElement.currentTime = 0;
        this.handleAudioOnstop();
    }

    public toPrevious() {
        return this.toPosition('previous');
    }

    public toNext() {
        return this.toPosition('next');
    }

    public toFirst() {
        return this.toPosition('first');
    }

    public toLast() {
        return this.toPosition('last');
    }

    // TODO タイトルの取得方法を実装する．現在取得できていない．
    public get title() {
        return this.audioElement.title;
    }

    public set volume(value: number) {
        this.outputAudioElement.volume = value;
    }

    public get volume() {
        return this.outputAudioElement.volume;
    }

    public get duration() {
        return this.audioElement.duration;
    }

    public set currentTime(value: number) {
        this.audioElement.currentTime = value;
    }

    public get currentTime() {
        return this.audioElement.currentTime;
    }

    public set muted(value: boolean) {
        this.audioElement.muted = value;
    }

    public get muted() {
        return this.audioElement.muted;
    }

    public get status() {
        return this.audioStatus;
    }

    public set autoplay(value: boolean) {
        this.audioElement.autoplay = value;
    }

    public set settings(value: AudioPlayerSettings) {
        this.volume = value.volume;
        this.muted = value.isMuted;
        this.repeatMode = value.repeatMode;
        this.shuffleMode = value.shuffleMode;
    }

    public async getAudioDevices() {
        return (await navigator.mediaDevices.enumerateDevices()).filter(
            (device: MediaDeviceInfo) => device.kind === 'audiooutput',
        );
    }

    public set outputAudioDevice(device: MediaDeviceInfo) {
        this.currentOutputAudioDevice = device;
        this.outputAudioElement.setSinkId(device.deviceId);
    }

    public set onplay(callback: (ev: Event) => void) {
        this.audioElement.onplay = (ev: Event) => {
            console.log('onplay');
            callback(ev);
            this.audioStatus = AudioStatus.Playing;
            this.audioElement.autoplay = false;
        };
    }

    public set onpause(callback: (ev: Event) => void) {
        this.audioElement.onpause = (ev: Event) => {
            console.log('onpause');
            callback(ev);
            this.audioStatus = AudioStatus.Paused;
        };
    }

    public set onstop(callback: () => void) {
        this.handleAudioOnstop = () => {
            console.log('onstop');
            callback();
            this.audioStatus = AudioStatus.Stopped;
        };
    }

    public set ontimeupdate(callback: (ev: Event) => void) {
        this.audioElement.ontimeupdate = callback;
    }

    public set onloadedmetadata(callback: (ev: Event) => void) {
        console.log('onloadedmetadata');
        this.audioElement.onloadedmetadata = callback;
    }

    private toPosition(skipPosition: 'previous' | 'next' | 'first' | 'last') {
        let skipPositionIndex: number;
        switch (skipPosition) {
            case 'previous':
                skipPositionIndex = this.currentAudioIndex - 1;
                break;
            case 'next':
                skipPositionIndex = this.currentAudioIndex + 1;
                break;
            case 'first':
                skipPositionIndex = 0;
                break;
            case 'last':
                skipPositionIndex = this.playingList.length - 1;
                break;
        }

        if (this.playingList[skipPositionIndex] != undefined) {
            this.currentAudioIndex = skipPositionIndex;
            this.audioElement.src = this.playingList[this.currentAudioIndex];
            return true;
        } else {
            return false;
        }
    }
}

export default AudioController;
