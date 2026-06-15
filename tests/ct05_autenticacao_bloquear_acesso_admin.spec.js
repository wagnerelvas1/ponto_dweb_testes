import { test, expect } from '@playwright/test';

test('CT05 - deve bloquear acesso à tela de admin se o colaborador estiver logado porém sem ser admin', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('11111111111');

    await page.getByRole('textbox', { name: 'Senha' }).fill('senha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/.*\/primeiro-acesso/);

    await page.locator('#senha').fill('novaSenha123');

    await page.locator('#senha_confirmation').fill('novaSenha123');

    await page.getByRole('button', { name: 'Salvar e Fazer Login' }).click();

    await expect(page.locator('body')).toContainText('Senha atualizada com sucesso! Faça o login com sua nova senha.');

    await page.getByRole('textbox', { name: 'CPF' }).fill('11111111111');

    await page.getByRole('textbox', { name: 'Senha' }).fill('novaSenha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page).toHaveURL(/.*\/colaborador/);

    await page.goto('http://localhost:8000/admin');

    await expect(page.locator('body')).toContainText(/(403|Forbidden|Ação não autorizada|Unauthorized)/i);
});
