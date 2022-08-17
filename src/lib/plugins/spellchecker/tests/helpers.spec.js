import {
  createErrorMap,
  getherAllWords,
  createDecorations,
  debouncedCall
} from "../helpers";

import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";

function wait(delay, callback) {
  setTimeout(() => {
    callback();
  }, delay);
}

describe("Spellchecker helper functions", () => {
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

  describe("getAllWords", () => {
    const state = EditorState.create({
      schema,
      doc: schema.node("doc", null, [
        schema.node("paragraph", null, [schema.text("hello world")])
      ])
    });

    describe("finds all words", () => {
      const result = getherAllWords(state.doc);

      it("correctly", () => {
        expect(result[0].text).toBe("hello");
      });
    });
  });

  describe("createDecorations", () => {
    const state = EditorState.create({
      schema,
      doc: schema.node("doc", null, [
        schema.node("paragraph", null, [schema.text("hell donekey")])
      ])
    });
    const errors = [
      {
        correction: (2)[("donkey", "dolphin")],
        from: 6,
        text: "donekey",
        to: 13
      },
      { correction: ["horse"], from: 1, text: "hell", to: 5 }
    ];

    describe("creates decoration set from Error list", () => {
      const result = createDecorations(errors, state.doc);

      // Definetly not the way it should be checked but couldn't find any other for right now
      const length = result.children[2].local.length;

      it("with correct length of it", () => {
        expect(length).toBe(errors.length);
      });
    });
  });

  describe("debouncedCall", () => {
    it("is being called only once after several invocations", done => {
      const mockedCallback = jest.fn(() => {});
      debouncedCall(mockedCallback, 500);
      debouncedCall(mockedCallback, 500);

      wait(600, () => {
        expect(mockedCallback).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
