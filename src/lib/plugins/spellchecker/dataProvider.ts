import type {
  DataProvider,
  DataProviderAbortionController
} from "../dataProvider";

import { Word, Error } from "./types";

const DICTIONARY = [
  "donkey",
  "dolphin",
  "dog",
  "zebra",
  "snake",
  "snail",
  "sparrow",
  "spider",
  "shark",
  "lion",
  "lobster",
  "lizard",
  "lama",
  "locust",
  "cat",
  "rabbit",
  "giraffi",
  "horse"
];

interface LocalDataProviderAbortionController
  extends DataProviderAbortionController {
  timerId: ReturnType<typeof setTimeout>;
}

const suggester = (token: string) => {
  const result = new Set<string>();
  const dict = [...DICTIONARY];
  for (let i = 1; i < token.length; i++) {
    const char = token.slice(0, i);
    const words = dict.filter(d => d.startsWith(char));
    words.forEach(word => {
      if (word.length > token.length - 2 && word.length < token.length + 2)
        result.add(word);
    });
  }

  return Array.from(result);
};

export default class LocalDataProvider
  implements DataProvider<Word[], Error[]>
{
  private abortionController: LocalDataProviderAbortionController = {
    timerId: null,
    abort: function () {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
    }.bind(this)
  };

  get getAbortionController(): DataProviderAbortionController {
    return this.abortionController;
  }

  requestData(words: Word[]) {
    this.abortionController.abort();

    return new Promise<Error[]>(
      function (resolve: any) {
        this.abortionController.timerId = setTimeout(function () {
          const errors: Error[] = [];

          for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (!DICTIONARY.includes(word.text)) {
              const candidates = suggester(word.text);
              errors.push({ ...word, correction: candidates });
            }
          }
          resolve(errors);
        }, 2000);
      }.bind(this)
    );
  }
}
