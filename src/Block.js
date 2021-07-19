import React, { useState, useEffect } from "react";
import { blockAPI } from './utils/blockFrost';

function Block() {
	const [ wallet, setWallet ] = useState();
	const [ blockData, setBlockData ] = useState([]);

	useEffect(() => {
		async function loadData() {
			blockAPI
			.get(wallet)
			.then((res) => {
				setBlockData(res);
				console.log(res)
			})
		}

		loadData();
	}, [wallet]);

	return (
		<>
		</>
	)
}

export default Block;
