import React, { useState, useEffect } from "react";
import { BlockFrostAPI } from '@blockfrost/blockfrost-js';

function Block() {

	const [ testing, setTesting ] = useState();

	useEffect(() => {
		const API = new BlockFrostAPI({
			projectId: 'nOxYExpN734yqUqVTTXxUAOS7LW9rmma', // see: https://blockfrost.io
		});

		async function loadData() {
			// const address = await API.addresses(
			// 	'addr1q8s4m2knmfqg0ql54pq5fxrpyw7klf9k3lp6jz32xz4khuhzt50t3gkw5px9hvn85pzmzt4xxk3k3aqyfsm7vtmydgeqr8m5ja',
			// );

			const address = await API.accountsAddresses('addr1q8s4m2knmfqg0ql54pq5fxrpyw7klf9k3lp6jz32xz4khuhzt50t3gkw5px9hvn85pzmzt4xxk3k3aqyfsm7vtmydgeqr8m5ja');

			console.log(address)
		}

		loadData();
	}, []);

	return (
		<>
			{/* {testing[0].type} */}
		</>
	)
}

export default Block;
