import { ThreeSixtyOutlined } from '@material-ui/icons';

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

class AudioController {
    private audioContext: AudioContext;
    private audioElement: HTMLAudioElement;
    private sourceNode: MediaElementAudioSourceNode;
    private gainNode: GainNode;
    private destinationNode: MediaStreamAudioDestinationNode;
    private outputAudioElement: HTMLAudioElement;
    private playList: string[] | null;
    private currentOutputAudioDevice: MediaDeviceInfo | null;
    private audioStatus: AudioStatus;
    private handleAudioOnstop: () => void;
    private currentAudioIndex: number;

    public constructor(playList: string[] = []) {
        this.playList = playList;
        this.currentAudioIndex = this.playList.length === 0 ? -1 : 0;

        this.audioStatus = AudioStatus.Unknown;
        this.currentOutputAudioDevice = null;
        this.handleAudioOnstop = () => {};

        this.audioContext = new AudioContext();
        this.audioElement = new Audio(this.playList[0]);
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
            console.log(this.status);
            this.currentAudioIndex += 1;
            this.audioElement.src = this.playList[this.currentAudioIndex];
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
}

export default AudioController;
