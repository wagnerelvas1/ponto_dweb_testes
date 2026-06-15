import { test, expect } from '@playwright/test';

test('CT01 - deve redefinir senha no primeiro acesso', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('senha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/.*\/primeiro-acesso/);

    await page.locator('#senha').fill('novaSenha123');

    await page.locator('#senha_confirmation').fill('novaSenha123');

    await page.getByRole('button', { name: 'Salvar e Fazer Login' }).click();

    await expect(page.locator('body')).toContainText('Senha atualizada com sucesso! Faça o login com sua nova senha.');
});
