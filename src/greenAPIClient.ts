import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { API_URL, INSTANCE_ID, TOKEN } = process.env;
const URL = `${API_URL}/waInstance${INSTANCE_ID}`;

export const sendMessage = (chatId: string, message: string, quotedMessageId?: string) =>
    axios.post(`${URL}/sendMessage/${TOKEN}`, {chatId, message, quotedMessageId});

export const getChatHistory = (chatId: string, count = 5) =>
    axios.post(`${URL}/getChatHistory/${TOKEN}`, {chatId, count});

export const getStateInstance = () => axios.get(`${URL}/getStateInstance/${TOKEN}`);