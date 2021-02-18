import { BrowserWindow, app, dialog, ipcMain, ipcRenderer } from 'electron';
import ApiInterface from './apiInterface';

const sample = (arg: string) => {
    console.log(arg);
};

const hello = () => {
    ipcRenderer.send('hello', 'rend');
};

const playMusicTs = (arg: string) => {
    console.log(arg);
    ipcRenderer.send('play', arg);
};

const Api: ApiInterface = {
    sample,
    hello,
    playMusicTs,
};

export default Api;
