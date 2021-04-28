import React from "react";
import "./ToggleButton.css";
import { FaBars } from "react-icons/fa";

const drawerToggleButton = (props) => (
	<button className="toggleButton" onMouseDown={props.handleClick}>
		<FaBars />
	</button>
);

export default drawerToggleButton;
