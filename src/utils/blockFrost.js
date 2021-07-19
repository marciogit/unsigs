// dataAPI.js
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 's7ajbaK06nklyb2hdEZGGgqodSzCHR4n';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const blockAPI = axios.create({
	baseURL: 'https://cardano-mainnet.blockfrost.io/api/v0',
});
