class MusicPlayer {
    private audioContext: AudioContext;
    private audioElement: HTMLAudioElement;
    private sourceNode: MediaElementAudioSourceNode;
    private gainNode: GainNode;
    private destinationNode: MediaStreamAudioDestinationNode;
    private outputAudioElement: HTMLAudioElement;
    private playList: string[] | null;
    private currentOutputAudioDevice: MediaDeviceInfo | null;

    public constructor(playList: string[] = []) {
        this.playList = playList;

        this.currentOutputAudioDevice = null;

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
        this.audioElement.pause();
        this.outputAudioElement.pause();
        this.audioElement.currentTime = 0;
    }

    public set volume(value: number) {
        this.outputAudioElement.volume = value;
    }

    public get volume() {
        return this.outputAudioElement.volume;
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
}

export default MusicPlayer;
