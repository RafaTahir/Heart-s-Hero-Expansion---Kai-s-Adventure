import { expect, test } from "@playwright/test";

test("completes Courage with a reload, then restores all three regions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /begin adventure/i }).click();
  await page.getByRole("radio", { name: "Ages 8–9" }).check();
  await page.getByRole("radio", { name: "Feeling worried" }).check();
  await page.getByRole("radio", { name: "Quick Quest" }).check();
  await page.getByRole("button", { name: /hand to child/i }).click();

  await expect(page.getByRole("heading", { name: /choose a path/i })).toBeVisible();
  await page.getByRole("link", { name: /mountain of echoes/i }).click();
  await page.getByRole("button", { name: /step closer/i }).click();
  await page.getByRole("button", { name: /call into the cave/i }).click();
  await expect(page.getByRole("heading", { name: /one more step/i })).toBeVisible();
  await page.getByRole("button", { name: /take a small step/i }).click();

  await expect(page.getByRole("heading", { name: /a brave act/i })).toBeVisible();
  await page.getByRole("button", { name: "I'll do it" }).click();
  await expect(page.getByText(/mission saved/i)).toBeVisible();
  await page.reload();
  await expect(page.getByRole("button", { name: /i did it/i })).toBeVisible();
  await page.getByRole("link", { name: /back to map/i }).click();
  await expect(page.getByRole("link", { name: /mission accepted/i })).toBeVisible();
  await page.getByRole("link", { name: /mission accepted/i }).click();
  await page.getByRole("button", { name: /i did it/i }).click();

  await expect(page.getByRole("heading", { name: /light returns/i })).toBeVisible();
  await page.getByRole("button", { name: /skip animation/i }).click();
  await page.getByRole("button", { name: /see reward/i }).click();
  await expect(page.getByRole("heading", { name: /courage compass/i })).toBeVisible();
  await page.getByRole("button", { name: /add to collection/i }).click();
  await expect(page.getByText(/added to your collection/i)).toBeVisible();
  await page.getByRole("link", { name: /back to map/i }).click();
  await expect(page.getByRole("link", { name: /whispering woods/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /bridge of falling stars/i })).toBeVisible();

  await page.getByRole("link", { name: /whispering woods/i }).click();
  await page.getByRole("button", { name: /step closer/i }).click();
  await page.getByRole("button", { name: /share the lantern/i }).click();
  await expect(page.getByRole("heading", { name: /pass the light/i })).toBeVisible();
  await page.getByRole("button", { name: "I'll do it" }).click();
  await page.getByRole("button", { name: /i did it/i }).click();
  await page.getByRole("button", { name: /skip animation/i }).click();
  await page.getByRole("button", { name: /see reward/i }).click();
  await page.getByRole("button", { name: /add to collection/i }).click();
  await page.getByRole("link", { name: /back to map/i }).click();

  await page.getByRole("link", { name: /bridge of falling stars/i }).click();
  await page.getByRole("button", { name: /step closer/i }).click();
  await page.getByRole("button", { name: /pause and breathe/i }).click();
  await expect(page.getByRole("heading", { name: /try once more/i })).toBeVisible();
  await page.getByRole("button", { name: "I'll do it" }).click();
  await page.getByRole("button", { name: /i did it/i }).click();
  await page.getByRole("button", { name: /skip animation/i }).click();
  await page.getByRole("button", { name: /see reward/i }).click();
  await page.getByRole("button", { name: /add to collection/i }).click();
  await page.getByRole("link", { name: /view collection/i }).click();

  await expect(page.getByRole("heading", { name: /courage compass/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /kindness lantern/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /steady star/i })).toBeVisible();
});
