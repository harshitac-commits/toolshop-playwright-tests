import { test, expect } from '@playwright/test';

test('customer can log in with valid credentials', async({page})=>{
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByLabel('Email address').fill('hp.playwright.login@example.com');  
    await page.getByTestId('password').fill('_Test1234@HP');
    
    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page).toHaveURL(/\/account/);


});

test('login fails with an unregistered user', async({page})=>{
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.getByLabel('Email address').fill('not-reg.playwright.login@example.com');  
    await page.getByTestId('password').fill('Test1234');

    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByTestId('login-error')).toHaveText('Invalid email or password');
});