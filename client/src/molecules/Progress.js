import React, { useContext } from "react";
import "./progress.css";

import { ThemeContext } from "../themeContext";

const Progress = ({ percentage, status }) => {
	let theme = useContext(ThemeContext);
	return (
		<div>
			<div className="progress">
				<div
					className="progress-bar progress-bar-striped progress-bar-animated"
					role="progressbar"
					style={{
						width: status == 200 ? `${percentage}%` : "0%",
						backgroundColor: theme.yellow.dark,
					}}
				>
					{" "}
					{status == 200 && `${percentage}%`}
				</div>
			</div>
		</div>
	);
};

export default Progress;
