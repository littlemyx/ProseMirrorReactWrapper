import type { DataProvider } from "../dataProvider";
declare class LocalDataProvider implements DataProvider<string, string[]> {
    private localDictionary;
    private abortionController;
    get getAbortionControllerHandler(): () => void;
    requestData(token: string): Promise<string[]>;
}
export default LocalDataProvider;
export { DataProvider };
