import React, { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Axios from "axios";
import "./SideDrawer.css";

const currentDomain = "http://localhost:3000";

const SideDrawer = ({ sideDrawerOpen, setSideDrawerOpen }) => {
	const { logout } = useAuth0();

	return (
		<nav className="sidedrawer">
			<ul>
				<li>
					<button
						className="logout"
						onClick={() => {
							logout({
								returnTo: `${currentDomain}/login`,
								client_id: "oBVOt49DbmVeyo07kAZ11hay3GxPqYT1",
							});
						}}
					>
						Logout
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default SideDrawer;
