import React, { useState, useEffect, useContext } from "react";
import "./nav.css";
import { ThemeContext } from "../themeContext";
import DrawerToggleButton from "./ToggleButton";
import { NavLink, useLocation } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import NavDropdown from "./NavDropdown";

const Nav = () => {
	let themes = useContext(ThemeContext);
	const [sideDrawerOpen, setSideDrawerOpen] = useState();
	const [color, setColor] = useState();
	const location = useLocation();

	const styles = {
		color,
	};

	const drawerToggleClickHandler = () => {
		setSideDrawerOpen(!sideDrawerOpen);
	};

	return (
		<div>
			{sideDrawerOpen && (
				<SideDrawer sideDrawerOpener={setSideDrawerOpen} />
			)}

			<header className="toolbar">
				<nav
					className="toolbar_nav"
					style={{ background: themes.blue.dark }}
				>
					<div>
						{/* <a href="/">
							<img src={Logo} alt="Logo" />
						</a> */}
					</div>
					<div className="space" />
					<div className="toolbar_navItems">
						<ul>
							<li className="navbarTabs">
								<NavLink
									to="/today"
									activeStyle={{ color: themes.orange.dark }}
								>
									Today
								</NavLink>
							</li>
							<li className="navbarTabs">
								<NavLink
									to="/calendar"
									activeStyle={{ color: themes.orange.dark }}
								>
									Calendar
								</NavLink>
							</li>
							<li className="navbarTabs">
								<NavLink
									to="/progress"
									activeStyle={{ color: themes.orange.dark }}
								>
									Progress
								</NavLink>
							</li>
						</ul>
					</div>
					<DrawerToggleButton
						handleClick={drawerToggleClickHandler}
					/>
				</nav>
			</header>
		</div>
	);
};

export default Nav;
