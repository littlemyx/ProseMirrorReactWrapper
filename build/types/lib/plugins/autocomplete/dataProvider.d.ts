interface DataProvider {
    getAbortionControllerHandler: () => void;
    requestData(token: string): Promise<string[]>;
}
declare class LocalDataProvider implements DataProvider {
    private localDictionary;
    private abortionController;
    get getAbortionControllerHandler(): () => void;
    requestData(token: string): Promise<string[]>;
}
export default LocalDataProvider;
export { DataProvider };
