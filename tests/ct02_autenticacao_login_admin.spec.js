import { test, expect } from '@playwright/test';

test('CT02 - deve permitir login com credenciais válidas de administrador', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('novaSenha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.locator('body')).toContainText('Olá, Administrador!');
});
