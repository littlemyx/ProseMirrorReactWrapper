import type {
  DataProvider,
  DataProviderAbortionController
} from "../dataProvider";

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

class LocalDataProvider implements DataProvider<string, string[]> {
  private localDictionary: Record<string, string[]> = {};
  private abortionController: LocalDataProviderAbortionController = {
    timerId: null,
    abort: function () {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
    }.bind(this)
  };

  get getAbortionControllerHandler(): () => void {
    return this.abortionController.abort;
  }

  requestData(token: string) {
    this.abortionController.abort();

    return new Promise<string[]>(
      function (resolve: any) {
        if (this.localDictionary[token]) {
          resolve(this.localDictionary[token]);
        } else {
          // Emulating the network request
          this.abortionController.timerId = setTimeout(
            function () {
              this.abortionController.timerId = null;

              const results = DICTIONARY.filter(
                key =>
                  key.length > token.length &&
                  key.startsWith(token.toLowerCase())
              );

              // Do the local caching
              this.localDictionary[token] = results;

              resolve(results);
            }.bind(this),
            2000
          );
        }
      }.bind(this)
    );
  }
}

export default LocalDataProvider;
export { DataProvider };
