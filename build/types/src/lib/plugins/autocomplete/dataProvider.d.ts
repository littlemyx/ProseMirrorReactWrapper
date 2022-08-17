import type { DataProvider, DataProviderAbortionController } from "../dataProvider";
declare class LocalDataProvider implements DataProvider<string, string[]> {
    private localDictionary;
    private abortionController;
    get getAbortionController(): DataProviderAbortionController;
    requestData(token: string): Promise<string[]>;
}
export default LocalDataProvider;
export { DataProvider };
