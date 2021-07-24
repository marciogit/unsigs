import React, { useState } from 'react';
import { Switch } from 'antd';
import { useBetween } from "use-between";

const useShareableState = () => {
	const [count, setCount] = useState(false);
	return {
		count,
		setCount
	};
};

function Welcome({name, hello}) {
	const { count, setCount } = useBetween(useShareableState);
	const [ toggle, setToggle ] = useState(false);
	function onChange(checked) {
		console.log(`${checked}`);
	}
	return (
		<>
			<h1>{name}{count}</h1>
			<button onClick={() => setCount(count)}>Click me</button>
			<Switch onChange={onChange}/>
		</>
	)
}

function Garage() {
	const { count, setCount } = useBetween(useShareableState);
	function onChange(checked) {
		console.log(`${checked}`);
	}
	return (
		<div className="App">

			{count}
			<button onClick={() => setCount(count + 1)}>Click me</button>
		</div>
	);
}
export default Garage;
