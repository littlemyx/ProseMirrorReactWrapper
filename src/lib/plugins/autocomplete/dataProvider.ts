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

interface DataProviderAbortionController {
  abort(): void;
}

interface LocalDataProviderAbortionController
  extends DataProviderAbortionController {
  timerId: ReturnType<typeof setTimeout>;
}

interface DataProvider {
  getAbortionControllerHandler: () => void;
  requestData(token: string): Promise<string[]>;
}

class LocalDataProvider implements DataProvider {
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

    return new Promise<string[]>((resolve, reject) => {
      if (this.localDictionary[token]) {
        resolve(this.localDictionary[token]);
      } else {
        // Emulating the network request
        this.abortionController.timerId = setTimeout(() => {
          this.abortionController.timerId = null;

          const results = DICTIONARY.filter(
            key =>
              key.length > token.length && key.startsWith(token.toLowerCase())
          );

          // Do the local caching
          this.localDictionary[token] = results;

          resolve(results);
        }, 2000);
      }
    });
  }
}

export default LocalDataProvider;
export { DataProvider };
