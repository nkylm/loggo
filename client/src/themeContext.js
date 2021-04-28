import React from "react";

export const themes = {
	yellow: {
		dark: "#F2CC8F",
		light: "#F4F1DE",
	},
	orange: {
		dark: "#E07A5F",
	},
	green: {
		light: "#81b29a",
	},
	blue: {
		dark: "#3D405B",
	},
};

export const ThemeContext = React.createContext(themes);
