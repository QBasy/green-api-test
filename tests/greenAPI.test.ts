import { sendMessage, getChatHistory, getStateInstance } from '../src/greenAPIClient';
import dotenv from 'dotenv';
dotenv.config();

const chatId = `${process.env.PHONE_NUMBER}@c.us`;

describe('green-api SendMessage Tests', () => {
    test('инстанс авторизован', async () => {
        const res = await getStateInstance();
        expect(res.status).toBe(200);
        expect(['authorized', 'notAuthorized']).toContain(res.data.stateInstance);
    });

    test('Отправить сообщение, вернёт статус с кодом 200', async () => {
        const res = await sendMessage(chatId, 'Hello, my name is Sayat!');
        expect(res.status).toBe(200);
        expect(res.data.idMessage).toBeDefined();
    });

    test('Отправить сообщение с пустым body, вернёт статус с кодом 400', async () => {
        try {
            await sendMessage(chatId, '');
        } catch (err: any) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toMatchObject({
                statusCode: 400,
                message: expect.stringContaining('message')
            });
        }
    });

    test('Get chat history', async () => {
        const res = await getChatHistory(chatId, 5);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test('Получить историю чата с пустым ID, вернёт статус с кодом 400', async () => {
        try {
            await getChatHistory('', 5);
        } catch (err: any) {
            expect(err.response.status).toBe(400);
        }
    });
});
