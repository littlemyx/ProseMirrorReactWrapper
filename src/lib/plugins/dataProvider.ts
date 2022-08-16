export interface DataProviderAbortionController {
  abort(): void;
}
export interface DataProvider<T, U> {
  getAbortionControllerHandler: () => void;
  requestData(token: T): Promise<U>;
}
