// dataAPI.js
import axios from 'axios';

export const dataAPI = axios.create({
	baseURL: 'https://pool.pm/wallet/',
});
