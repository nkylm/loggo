import React from "react";
import { NavLink } from "react-router-dom";
import "./navDropdown.css";

const NavDropdown = ({ title, items, styles }) => {
	return (
		<>
			<button className="dropBtn" style={styles}>
				{title}
			</button>
			<ul className="menu">
				{items.map((item, i) => (
					<li key={i} className="dropItem">
						<NavLink
							to={item.url}
							activeStyle={{ color: "#8579f6" }}
						>
							{item.name}
						</NavLink>
					</li>
				))}
			</ul>
		</>
	);
};

export default NavDropdown;
