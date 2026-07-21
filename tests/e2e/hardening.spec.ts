import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const storageKey = "heart-hero:kai-adventure:progress";
const completeProgress = {
  schemaVersion: 1,
  setup: { ageBand: "8-9", challengeId: "sharing", journeyLength: "quick" },
  selectedQuestIds: {
    "mountain-of-echoes": "courage-echoes-v1",
    "whispering-woods": "kindness-woods-v1",
    "bridge-of-falling-stars": "perseverance-bridge-v1",
  },
  activeRun: null,
  missions: {
    "courage-echoes-v1": { status: "completed" },
    "kindness-woods-v1": { status: "completed" },
    "perseverance-bridge-v1": { status: "completed" },
  },
  completedQuestIds: ["courage-echoes-v1", "kindness-woods-v1", "perseverance-bridge-v1"],
  restoredRegionIds: ["mountain-of-echoes", "whispering-woods", "bridge-of-falling-stars"],
  collectedRewardIds: ["courage-compass", "kindness-lantern", "perseverance-star"],
};

async function seed(page: Page) {
  await page.addInitScript(([key, value]) => localStorage.setItem(key, JSON.stringify(value)), [storageKey, completeProgress] as const);
}

async function expectNoAxeViolations(page: Page) {
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
}

test("major screens pass axe and public routes refresh", async ({ page }) => {
  await seed(page);
  const routes: Array<[string, RegExp]> = [
    ["/", /kai's world is losing its light/i],
    ["/setup", /set the first trail/i],
    ["/map", /choose a path/i],
    ["/quest/mountain-of-echoes/arrival", /mountain of echoes/i],
    ["/mission/mountain-of-echoes", /a brave act/i],
    ["/transform/mountain-of-echoes", /light returns|restored/i],
    ["/reward/mountain-of-echoes", /courage compass/i],
    ["/collection", /hero collection/i],
    ["/grown-up", /grown-up journal/i],
    ["/reset", /reset this adventure/i],
  ];
  for (const [route, heading] of routes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    await expectNoAxeViolations(page);
  }
});

test("setup works by keyboard and keeps child controls at least 44px", async ({ page }) => {
  await page.goto("/setup");
  await expect(page.getByRole("heading", { name: /set the first trail/i })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /choose a path/i })).toBeFocused();
  const undersized = await page.locator("a, button, input").evaluateAll((controls) => controls.filter((control) => {
    const rect = control.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44);
  }).map((control) => control.getAttribute("aria-label") ?? control.textContent?.trim() ?? control.tagName));
  expect(undersized).toEqual([]);
});

test("reduced motion restores immediately and responsive maps remain usable", async ({ page }) => {
  await seed(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/transform/mountain-of-echoes");
  await expect(page.getByRole("heading", { name: /mountain of echoes restored/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /see reward/i })).toBeVisible();

  for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 900 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/map");
    await expect(page.getByRole("heading", { name: /choose a path/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /mountain of echoes/i })).toBeVisible();
    await page.screenshot({ path: `test-results/evidence/map-${viewport.width}.png`, fullPage: true });
  }
});
