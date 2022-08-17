import LocalDataProvider from "../dataProvider";

describe("Spellchecker DataProvider", () => {
  it("creates", () => {
    const dataProvider = new LocalDataProvider();

    expect(dataProvider).toBeDefined();
  });
  it("has an abort methods", () => {
    const dataProvider = new LocalDataProvider();

    expect(dataProvider.getAbortionController).toBeDefined();
  });
  it("returns correct data", async () => {
    const correctWord = "donkey";
    const word = "donke";

    const dataProvider = new LocalDataProvider();
    const [suggest] = await dataProvider.requestData(word);

    expect(suggest).toBe(correctWord);
  });
});
