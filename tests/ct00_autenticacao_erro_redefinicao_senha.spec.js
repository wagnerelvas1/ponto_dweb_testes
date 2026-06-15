import { test, expect } from '@playwright/test';

test('CT00 - deve exibir erro ao tentar redefinir senha provisória com senhas diferentes', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('senha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/.*\/primeiro-acesso/);

    await page.locator('#senha').fill('novaSenha123');

    await page.locator('#senha_confirmation').fill('senhaDiferente123');

    await page.getByRole('button', { name: 'Salvar e Fazer Login' }).click();

    await expect(page.locator('body')).toContainText('As senhas não coincidem. Digite novamente.');
});
