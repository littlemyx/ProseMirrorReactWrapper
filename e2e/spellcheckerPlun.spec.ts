import { test, expect } from "@playwright/test";

test.describe("Spellchecker plugin", async () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:9000/");
  });

  test("adds the decoration to words with errors", async ({ page }) => {
    const text = "donekey";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.waitForTimeout(6000);

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p span"
    );

    await expect(content).toHaveClass("spellError");
  });

  test("shows the popup", async ({ page }) => {
    const text = "donk";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.waitForTimeout(6000);

    await page.keyboard.down("Alt");

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p span"
    );

    await content.click();

    const popup = page.locator(".ProseMirrorContainer .popup");

    await expect(popup).toHaveCount(1);
  });

  test("closes popup on click", async ({ page }) => {
    const text = "donk";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.waitForTimeout(6000);

    await page.keyboard.down("Alt");

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p span"
    );

    await content.click();

    await page.keyboard.up("Alt");

    await editor.click();

    const popup = page.locator(".ProseMirrorContainer .popup");

    await expect(popup).toHaveCount(0);
  });

  test("closes popup on entering a new key", async ({ page }) => {
    const text = "donk";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.waitForTimeout(6000);

    await page.keyboard.down("Alt");

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p span"
    );

    await content.click();

    await page.keyboard.up("Alt");

    await page.keyboard.type("e");

    const popup = page.locator(".ProseMirrorContainer .popup");

    await expect(popup).toHaveCount(0);
  });

  test("replaces the word with error", async ({ page }) => {
    const text = "donekey";
    const word = "donkey";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.waitForTimeout(6000);

    await page.keyboard.down("Alt");

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p span"
    );

    await content.click();

    const option = page.locator(".ProseMirrorContainer .popup li:nth-child(1)");

    await option.click();

    await expect(editor).toHaveText(word);
  });
});
