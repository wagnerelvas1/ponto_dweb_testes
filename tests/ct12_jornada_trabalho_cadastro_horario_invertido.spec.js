import { test, expect } from '@playwright/test';

test.describe('Painel Administrativo - Gestão de Jornadas de Trabalho', () => {

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

  test('CT12 - deve cadastrar jornada de trabalho com horário de entrada depois do horário de saída', async ({ page }) => {
    await page.getByRole('link', { name: 'Jornadas de Trabalho' }).click();
    await page.getByRole('button', { name: 'Nova Jornada' }).click();

    const jornadaNome = `Jornada Noturna ${Date.now()}`;
    await page.locator('#input_nome').fill(jornadaNome);
    await page.locator('#input_entrada_prevista').fill('22:00');
    await page.locator('#input_saida_prevista').fill('06:00');
    await page.locator('#input_carga_horaria_diaria').fill('8');
    await page.locator('#input_tolerancia').fill('15');

    await page.locator('#submit-modal_nova_jornada').click();

    await expect(page.locator('body'))
      .toContainText('Jornada criada com sucesso!');

    await expect(page.locator('body'))
      .toContainText(jornadaNome);
  });

});
