import { test, expect } from "@playwright/test";

test.describe("Autocomplete plugin", async () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:9000/");
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

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

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

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

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

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

    await page.keyboard.type("e");

    const popup = page.locator(".ProseMirrorContainer .popup");

    await expect(popup).toHaveCount(0);
  });

  test("addes the selected ending", async ({ page }) => {
    const text = "donk";
    const word = "donkey";
    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

    const option = page.locator(".ProseMirrorContainer .popup li");

    await option.click();

    await expect(editor).toHaveText(word);
  });

  test("shows several options", async ({ page }) => {
    const text = "do";

    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

    const options = page.locator(".ProseMirrorContainer .popup li");

    await expect(options).toHaveCount(3);
  });

  test("shares the mark with the original text", async ({ page }) => {
    const text = "donk";

    const strongTogglerButton = page.locator(
      ".ProseMirror-menuitem:nth-child(2)"
    );

    await strongTogglerButton.click();

    // create a locator
    const editor = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror"
    );

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await page.keyboard.press("Tab");

    await page.waitForTimeout(6000);

    const option = page.locator(".ProseMirrorContainer .popup li");

    await option.click();

    const content = page.locator(
      ".ProseMirrorContainer .ProseMirror .ProseMirror p em"
    );

    await expect(content).toHaveCount(1);
  });
});
