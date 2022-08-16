import { test, expect } from "@playwright/test";

test.describe("Basic tests", async () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("http://localhost:9000/");
  });

  test("Editor is focusable", async ({ page }) => {
    // create a locator
    const editor = page.locator(".ProseMirror .ProseMirror");

    // Expect an attribute "to be strictly equal" to the value.
    await expect(editor).toHaveAttribute("contenteditable", "true");

    // Click the get started link.
    await editor.click();

    // Expects the URL to contain intro.
    await expect(editor).toHaveClass("ProseMirror ProseMirror-focused");
  });

  test("Editor is editable", async ({ page }) => {
    const text = "Hello World!";
    // create a locator
    const editor = page.locator(".ProseMirror .ProseMirror");

    // Click the get started link.
    await editor.click();

    await page.keyboard.type(text);

    await expect(editor).toHaveText(text);
  });
});
