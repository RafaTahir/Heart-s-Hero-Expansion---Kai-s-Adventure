import { expect, test } from "@playwright/test";

const key = "heart-hero:kai-adventure:progress";
const base = {
  schemaVersion: 1,
  setup: { ageBand: "8-9", challengeId: "fear", journeyLength: "quick" },
  selectedQuestIds: {
    "mountain-of-echoes": "courage-echoes-v1",
    "whispering-woods": "kindness-woods-v1",
    "bridge-of-falling-stars": "perseverance-bridge-v1",
  },
  activeRun: null,
  missions: {},
  completedQuestIds: [],
  restoredRegionIds: [],
  collectedRewardIds: [],
};

const restored = {
  ...base,
  missions: {
    "courage-echoes-v1": { status: "completed" },
    "kindness-woods-v1": { status: "completed" },
    "perseverance-bridge-v1": { status: "completed" },
  },
  completedQuestIds: ["courage-echoes-v1", "kindness-woods-v1", "perseverance-bridge-v1"],
  restoredRegionIds: ["mountain-of-echoes", "whispering-woods", "bridge-of-falling-stars"],
  collectedRewardIds: ["courage-compass", "kindness-lantern", "perseverance-star"],
};

test("capture stable judge-facing product evidence", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.evaluate(([storageKey, value]) => localStorage.setItem(storageKey, JSON.stringify(value)), [key, base] as const);
  await page.reload();
  await expect(page.getByRole("heading", { name: /kai's world is losing its light/i })).toBeVisible();
  await page.screenshot({ path: "docs/evidence/opening-faded-1280.png", fullPage: true });
  await page.goto("/map");
  await page.screenshot({ path: "docs/evidence/map-sleeping-1280.png", fullPage: true });

  await page.evaluate(([storageKey, value]) => localStorage.setItem(storageKey, JSON.stringify(value)), [key, restored] as const);
  for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 900 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/map");
    await page.screenshot({ path: `docs/evidence/map-restored-${viewport.width}.png`, fullPage: true });
  }
  await page.goto("/collection");
  await page.screenshot({ path: "docs/evidence/collection-complete-1280.png", fullPage: true });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/transform/mountain-of-echoes");
  await page.waitForTimeout(1400);
  await page.screenshot({ path: "docs/evidence/courage-transformation-midpoint-1280.png", fullPage: true });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await expect(page.getByRole("heading", { name: /mountain of echoes restored/i })).toBeVisible();
  await page.screenshot({ path: "docs/evidence/courage-reduced-motion-final-1280.png", fullPage: true });

  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto("/setup");
  await page.keyboard.press("Tab");
  await page.screenshot({ path: "docs/evidence/setup-keyboard-focus-768.png", fullPage: true });
});
