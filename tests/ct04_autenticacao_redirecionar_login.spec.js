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

  test('CT04 - deve redirecionar para tela de login ao tentar acessar sem login', async ({ page }) => {
    await page.goto('http://localhost:8000/admin');

    await expect(page).toHaveURL(/.*\/login/);
  });

});
