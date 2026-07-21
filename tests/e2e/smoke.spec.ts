import { expect, test } from "@playwright/test";

test("opens the illustrated map at a direct route", async ({ page }) => {
  await page.goto("/map");
  await expect(page.getByRole("heading", { name: /choose a path/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /mountain of echoes/i })).toBeVisible();
});
