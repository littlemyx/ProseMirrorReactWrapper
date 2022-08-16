import type { DataProvider } from "../dataProvider";
import { Word, Error } from "./types";
declare class LocalDataProvider implements DataProvider<Word[], Error[]> {
    private abortionController;
    get getAbortionControllerHandler(): () => void;
    requestData(words: Word[]): Promise<Error[]>;
}
export default LocalDataProvider;
export { DataProvider };
