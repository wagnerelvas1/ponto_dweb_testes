import { test, expect } from '@playwright/test';

test('CT08 - deve editar colaborador alterando apenas o cargo', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('novaSenha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.locator('body')).toContainText('Olá, Administrador!');

    await page.locator('a:has-text("Painel Administrativo")').click();

    await page.getByRole('link', { name: 'Colaboradores' }).click();

    await page.locator('a[title="Editar"]').first().click();
    await expect(page).toHaveURL(/.*\/admin\/colaboradores\/.*\/edit/);

    const currentCargo = await page.locator('#input_update_cargo_id').inputValue();
    const nextCargo = currentCargo === '2' ? '4' : '2';

    await page.locator('#input_update_cargo_id').selectOption(nextCargo);

    await page.getByRole('button', { name: 'Salvar Alterações' }).click();

    await expect(page.locator('body')).toContainText('Colaborador atualizado com sucesso!');
});
