import {Builder, By, until, WebDriver, WebElement} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { sendMessage } from "../src/greenAPIClient";
import dotenv from 'dotenv';
dotenv.config();

const URL: string | undefined = "https://console.green-api.com/app/api/sendMessage";
jest.setTimeout(30000);

describe('GREEN-API SendMessage UI (emulated)', (): void => {
    let driver: WebDriver;

    beforeAll(async (): Promise<void> => {
        driver = await new Builder()
            .forBrowser('chrome')
            .build();
        
        await driver.get(URL);

        const emailInput: WebElement = await driver.wait(until.elementLocated(By.id('login')), 10000);
        const passwordInput: WebElement = await driver.findElement(By.id('password'));
        const loginButton: WebElement = await driver.findElement(By.css('button[type="submit"]'));

        await emailInput.sendKeys('c0mplexie1@gmail.com');
        await passwordInput.sendKeys(process.env.PASSWORD || "Password");
        await loginButton.click();

        await driver.wait(until.urlContains('/instanceList'), 10000);

        await driver.get(URL);

        await driver.wait(until.elementLocated(By.id('chatId_0')), 10000);
    });

    afterAll(async (): Promise<void> => {
        await driver.quit();
    });

    test('Отправить сообщение c помощью Selenium', async (): Promise<void> => {
        const phoneInput: WebElement = await driver.findElement(By.id('chatId_0'));
        const messageInput: WebElement = await driver.findElement(By.id('message'));
        const sendButton: WebElement = await driver.findElement(By.css('button[type="submit"]'));

        const phone:string = process.env.PHONE_NUMBER || '77055326955';
        await phoneInput.sendKeys(phone);

        const messageText = 'Тест через Selenium';
        await messageInput.sendKeys(messageText);

        await sendButton.click();

        const statusEl: WebElement = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'idMessage')]")), 10000);
        const resultText:string = await statusEl.getText();

        expect(resultText).toMatch(/idMessage|успешно/i);
    });
});
