import { createErrorMap } from "../helpers";

describe("Spellchecker helper function", () => {
  describe("createErrorMap", () => {
    const errors = [
      { text: "test", from: 0, to: 4, correction: ["text", "temp"] },
      { text: "mars", from: 5, to: 9, correction: ["mask", "mank"] },
      { text: "date", from: 10, to: 14, correction: ["data"] }
    ];
    describe("creates error map", () => {
      const result = createErrorMap(errors);

      it("with correct correction", () => {
        expect(result["0-4"][0]).toBe(errors[0].correction[0]);
        expect(result["0-4"][1]).toBe(errors[0].correction[1]);
      });

      it("with correct length", () => {
        expect(Object.keys(result).length).toBe(errors.length);
      });
    });
  });
});
