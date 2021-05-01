import React from "react";

export const constants = {
	EVENTS: [
		"Eat",
		"Drink",
		"Pee",
		"Poop",
		"Sleep",
		"Exercise",
		"Treat",
		"Accident",
	],
};

export const ConstantContext = React.createContext(constants);
