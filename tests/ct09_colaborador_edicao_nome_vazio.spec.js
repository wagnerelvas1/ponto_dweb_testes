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

  test('CT09 - não deve editar colaborador se o nome for deixado vazio', async ({ page }) => {
    await page.getByRole('link', { name: 'Colaboradores' }).click();

    await page.locator('a[title="Editar"]').first().click();

    await page.locator('#input_update_nome').fill('');

    await page.getByRole('button', { name: 'Salvar Alterações' }).click();

    await expect(page.locator('body'))
      .toContainText('O campo nome do colaborador é obrigatório.');
  });

});
