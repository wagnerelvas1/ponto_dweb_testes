import { test, expect } from '@playwright/test';

test('CT03 - não deve permitir login com credenciais inválidas', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('senhaIncorreta123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.locator('body')).toContainText('CPF ou SENHA incorretos. Por favor, tente novamente.');
});
