import type { DataProvider } from "../dataProvider";
import { Word, Error } from "./types";
export default class LocalDataProvider implements DataProvider<Word[], Error[]> {
    private abortionController;
    get getAbortionControllerHandler(): () => void;
    requestData(words: Word[]): Promise<Error[]>;
}
