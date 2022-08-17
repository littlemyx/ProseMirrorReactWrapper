export interface DataProviderAbortionController {
  abort(): void;
}
export interface DataProvider<T, U> {
  getAbortionControllerHandler: () => void;
  requestData(_token: T): Promise<U>;
}
