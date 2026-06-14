import { test, expect } from '@playwright/test';

test.describe('Painel Administrativo - Gestão de Colaboradores', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8000');
    
    await page.getByRole('textbox', { name: 'CPF' })
      .fill('00000000000');
      
    await page.getByRole('textbox', { name: 'Senha' })
      .fill('senha123');
      
    await page.getByRole('button', { name: 'Entrar' })
      .click();

    await page.locator('a:has-text("Painel Administrativo")')
      .click();

    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('CT06 - deve cadastrar colaborador com valores válidos', async ({ page }) => {
    await page.getByRole('link', { name: 'Colaboradores' }).click();

    await page.getByRole('button', { name: 'Novo Colaborador' }).click();

    const randomDigit = () => Math.floor(Math.random() * 10);
    const uniqueCpf = `${randomDigit()}${randomDigit()}${randomDigit()}.${randomDigit()}${randomDigit()}${randomDigit()}.${randomDigit()}${randomDigit()}${randomDigit()}-${randomDigit()}${randomDigit()}`;
    const uniqueEmail = `playwright.${Date.now()}@empresa.com`;
    const colaboradorNome = `Colaborador Playwright ${Date.now()}`;

    await page.locator('#input_nome').fill(colaboradorNome);
    await page.locator('#input_cpf').fill(uniqueCpf);
    await page.locator('#input_email').fill(uniqueEmail);
    await page.locator('#input_senha').fill('senhaProvisoria123');
    await page.locator('#input_unidade_id').selectOption('1');
    await page.locator('#input_cargo_id').selectOption('2');

    await page.locator('#submit-modal_novo_colaborador').click();

    await expect(page.locator('body'))
      .toContainText('Colaborador cadastrado com sucesso!');

    await expect(page.locator('table'))
      .toContainText(colaboradorNome);
  });

});
