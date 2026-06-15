import { test, expect } from '@playwright/test';

test('CT04 - deve redirecionar para tela de login ao tentar acessar sem login', async ({ page }) => {
    await page.goto('http://localhost:8000/admin');

    await expect(page).toHaveURL(/.*\/login/);
});
