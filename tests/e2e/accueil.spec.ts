import { expect, test } from "@playwright/test";

test("CA01: le producteur choisit le wolof et l'interface passe en wolof", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");

  await page.getByRole("button", { name: "Wolof" }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "wo");
  await expect(page.getByRole("button", { name: "Wolof" })).toHaveAttribute("aria-pressed", "true");
});

test("l'accueil mène à l'espace producteur", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /producteur/i }).click();
  await expect(page).toHaveURL(/\/producteur$/);
});
