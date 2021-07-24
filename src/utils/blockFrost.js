// dataAPI.js
import axios from 'axios';

export const blockAPI = axios.create({
	baseURL: 'https://cardano-mainnet.blockfrost.io/api/v0/accounts/addr1q8s4m2knmfqg0ql54pq5fxrpyw7klf9k3lp6jz32xz4khuhzt50t3gkw5px9hvn85pzmzt4xxk3k3aqyfsm7vtmydgeqr8m5ja/addresses/assets',
});
