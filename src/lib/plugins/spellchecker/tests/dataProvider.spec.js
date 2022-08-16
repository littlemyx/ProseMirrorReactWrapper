import LocalDataProvider from "../dataProvider";

describe("Spellchecker DataProvider", () => {
  it("creates", () => {
    const dataProvider = new LocalDataProvider();

    expect(dataProvider).toBeDefined();
  });
  it("has an abort methods", () => {
    const dataProvider = new LocalDataProvider();

    expect(dataProvider.getAbortionControllerHandler).toBeDefined();
  });
  it("returns correct data", async () => {
    const correctWord = "donkey";
    const words = [{ text: "donekey", from: 0, to: 4 }];

    const dataProvider = new LocalDataProvider();
    const [error] = await dataProvider.requestData(words);

    expect(error.correction[0]).toBe(correctWord);
  });
});
