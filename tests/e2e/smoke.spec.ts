import { expect, test } from "@playwright/test";

test("opens the scaffold at a direct map route", async ({ page }) => {
  await page.goto("/map");
  await expect(page.getByRole("heading", { name: /kai's adventure is waking up/i })).toBeVisible();
});
