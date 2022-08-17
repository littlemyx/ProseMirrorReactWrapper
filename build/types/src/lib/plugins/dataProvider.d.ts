declare type Abort = () => void;
export interface DataProviderAbortionController {
    abort: Abort;
}
export interface DataProvider<T, U> {
    getAbortionController: DataProviderAbortionController;
    requestData(_token: T): Promise<U>;
}
export {};
