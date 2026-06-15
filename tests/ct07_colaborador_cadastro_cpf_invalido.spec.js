import { test, expect } from '@playwright/test';

test('CT07 - não deve cadastrar colaborador com CPF inválido', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('novaSenha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.locator('body')).toContainText('Olá, Administrador!');

    await page.locator('a:has-text("Painel Administrativo")').click();

    await page.getByRole('link', { name: 'Colaboradores' }).click();
    await page.getByRole('button', { name: 'Novo Colaborador' }).click();

    await page.locator('#input_nome').fill('Colaborador Invalido');
    await page.locator('#input_cpf').fill('123');
    await page.locator('#input_email').fill(`playwright.invalid.${Date.now()}@empresa.com`);
    await page.locator('#input_senha').fill('senhaProvisoria123');
    await page.locator('#input_unidade_id').selectOption('1');
    await page.locator('#input_cargo_id').selectOption('2');

    await page.locator('#submit-modal_novo_colaborador').click();

    await expect(page.locator('body')).toContainText('O CPF deve conter exatamente 11 caracteres (formato: 000.000.000-00).');
});
