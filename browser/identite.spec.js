import { test, expect } from '@playwright/test';

// Tests d'identité ArtBot dans le navigateur — critères SPEC 1 à 5.
// Rouges tant que l'interface ArtBot (renderPersona, suggestions) n'est pas implémentée.

async function pageNeuve(page) {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

const suggestions = (page) =>
  page.locator(
    '#suggestions li, #suggestions button, ul.suggestions li, [data-testid="suggestion"], [data-testid="suggestions"] li'
  );

test.describe('ArtBot — identité affichée (critères 1 à 4)', () => {
  test('C1 — la page chargée affiche le nom ArtBot', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.locator('body')).toContainText('ArtBot');
  });

  test('C2 — l’identité affichée contient exactement un emoji', async ({ page }) => {
    await pageNeuve(page);
    const identite = page.locator('header, #persona, #identite, [data-testid="persona"], [data-testid="identite"]').first();
    await expect(identite).toContainText('ArtBot');
    const texte = await identite.textContent();
    const emojis = (texte ?? '').match(/\p{Extended_Pictographic}/gu) ?? [];
    expect(emojis).toHaveLength(1);
    expect(texte).toContain('🎨');
  });

  test('C3 — le message d’accueil affiché contient ArtBot', async ({ page }) => {
    await pageNeuve(page);
    await expect(page.getByText(/Bonjour.*ArtBot/)).toBeVisible();
  });

  test('C4 — exactement trois suggestions liées aux musées et aux œuvres d’art', async ({ page }) => {
    await pageNeuve(page);
    await expect(suggestions(page)).toHaveCount(3);
    for (let i = 0; i < 3; i += 1) {
      await expect(suggestions(page).nth(i)).toContainText(/musée|musee|œuvre|oeuvre|art|louvre|paris|goût|gout/i);
    }
  });
});

test.describe('ArtBot — réponse signée (critère 5)', () => {
  test('C5 — la réponse à une question musées/œuvres d’art contient ArtBot', async ({ page }) => {
    await pageNeuve(page);
    await page.locator('#message').fill('Quels sont les meilleurs musées à Paris ?');
    await page.getByRole('button', { name: /envoyer/i }).click();
    await expect(page.locator('#messages li').last()).toContainText('ArtBot');
  });
});
