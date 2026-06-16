import { test, expect } from '@playwright/test';

test('CT11 - não deve cadastrar jornada de trabalho com horário de entrada depois do horário de saída', async ({ page }) => {
    await page.goto('http://localhost:8000');

    await page.getByRole('textbox', { name: 'CPF' }).fill('00000000000');

    await page.getByRole('textbox', { name: 'Senha' }).fill('novaSenha123');

    await page.getByRole('button', { name: 'Entrar' }).click();

    await expect(page.locator('body')).toContainText('Olá, Administrador!');

    await page.locator('a:has-text("Painel Administrativo")').click();

    await page.getByRole('link', { name: 'Jornadas de Trabalho' }).click();
    await page.getByRole('button', { name: 'Nova Jornada' }).click();

    await page.locator('#input_nome').fill(`Jornada Noturna ${Date.now()}`);
    await page.locator('#input_entrada_prevista').fill('22:00');
    await page.locator('#input_saida_prevista').fill('06:00');
    await page.locator('#input_carga_horaria_diaria').fill('8');
    await page.locator('#input_tolerancia').fill('15');

    await page.locator('#submit-modal_nova_jornada').click();

    await expect(page.locator('body')).toContainText('A hora de entrada não deve ser maior do que a hora de saída.');
});
