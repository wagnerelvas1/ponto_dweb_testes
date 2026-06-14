import { test, expect } from '@playwright/test';

test.describe('Painel Administrativo - Gestão de Cargos', () => {

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

  test('CT10 - deve cadastrar cargo com dados válidos', async ({ page }) => {
    await page.getByRole('link', { name: 'Cargos' }).click();
    
    await page.getByRole('button', { name: 'Novo Cargo' }).click();

    const uniqueCargoNome = `Cargo Playwright ${Date.now()}`;
    await page.locator('#input_nome').fill(uniqueCargoNome);
    await page.locator('#input_jornada_id').selectOption('1');

    await page.locator('#submit-modal_novo_cargo').click();

    await expect(page.locator('body'))
      .toContainText('Cargo criado com sucesso!');

    await expect(page.locator('table'))
      .toContainText(uniqueCargoNome);
  });

});
