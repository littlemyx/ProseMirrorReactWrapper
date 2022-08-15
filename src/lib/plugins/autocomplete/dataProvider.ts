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

interface DataProvider {
  requestData(token: string): Promise<string[]>;
}

class LocalDataProvider implements DataProvider {
  private requestController: AbortController = null;
  private localDictionary: Record<string, string[]> = {};
  private timerId: ReturnType<typeof setTimeout> = null;

  requestData(token: string) {
    this.requestController = new AbortController();
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }

    return new Promise<string[]>((resolve, reject) => {
      if (this.localDictionary[token]) {
        resolve(this.localDictionary[token]);
      } else {
        // Simulate the network request
        this.timerId = setTimeout(() => {
          this.timerId = null;

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
