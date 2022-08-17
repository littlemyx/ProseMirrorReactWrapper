import type { DataProvider, DataProviderAbortionController } from "../dataProvider";
import { Word, Error } from "./types";
export default class LocalDataProvider implements DataProvider<Word[], Error[]> {
    private abortionController;
    get getAbortionController(): DataProviderAbortionController;
    requestData(words: Word[]): Promise<Error[]>;
}
