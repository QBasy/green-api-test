import dotenv from 'dotenv';

dotenv.config();

const { API_URL, INSTANCE_ID, TOKEN } = process.env;
const URL = `${API_URL}/waInstance${INSTANCE_ID}`;

async function sendMessage(chatId: string, message: string, quotedMessageId?: string) {
    const body: any = { chatId, message };
    if (quotedMessageId) body['quotedMessageId'] = quotedMessageId;

    const res = await fetch(`${URL}/sendMessage/${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw { status: res.status, data: errorData };
    }
    return res.json();
}

async function getChatHistory(chatId: string, count = 5) {
    const body = { chatId, count };

    const res = await fetch(`${URL}/getChatHistory/${TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw { status: res.status, data: errorData };
    }
    return res.json();
}

async function getStateInstance() {
    const res = await fetch(`${URL}/getStateInstance/${TOKEN}`, {
        method: 'GET'
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw { status: res.status, data: errorData };
    }
    return res.json();
}

export { sendMessage, getChatHistory, getStateInstance };