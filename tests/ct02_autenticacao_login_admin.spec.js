import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

test.beforeAll(async () => {
  try {
    execSync('php artisan tinker --execute "\\App\\Models\\User::find(2)->update([\'senha_provisoria\' => true, \'senha\' => bcrypt(\'senha123\')]);"');
  } catch (e) {
    console.error("Erro ao resetar banco:", e);
  }
});

test.describe('Autenticação e Controle de Acesso', () => {

  test('CT02 - deve permitir login com credenciais válidas de administrador', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' })
      .fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' })
      .fill('senha123');

    await page.getByRole('button', { name: 'Entrar' })
      .click();

    await expect(page.locator('body'))
      .toContainText('Olá, Administrador!');
  });

});
