interface DataProvider {
    requestData(token: string): Promise<string[]>;
}
declare class LocalDataProvider implements DataProvider {
    private requestController;
    private localDictionary;
    private timerId;
    requestData(token: string): Promise<string[]>;
}
export default LocalDataProvider;
export { DataProvider };
