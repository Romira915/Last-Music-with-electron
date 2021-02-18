export default interface ApiInterface {
    sample: (arg: string) => void;
    hello: () => void;
    playMusicTs: (arg: string) => void;
}
// window オブジェクトに、core の定義を追加する。
declare global {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Window {
        Api: ApiInterface;
    }
}
