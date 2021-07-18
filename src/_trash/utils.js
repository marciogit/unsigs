import React from "react";

// The theme context.
export const ThemeContext = React.createContext(null);

export function generateItems() {
	const items = [
		{id: 0, color: 'green'},
		{id: 1, color: 'blue'},
		{id: 2, color: 'green'}
	];


	// for (let i = 0; i < 100; i++) {

	// 	const color = oneOf(["green", "blue"]);
	// 	const alphabet = "1234567890";
	// 	const title = oneOf(alphabet) + oneOf(alphabet);
	// 	const id = uuid++;

	// 	items.push({ id, color, title });
	// }

	return items;
}
