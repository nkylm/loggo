import React, { useEffect, useRef } from "react";
import "./SideDrawer.css";

const SideDrawer = ({ sideDrawerOpener }) => {
	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				sideDrawerOpener(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);

	return (
		<nav className="sidedrawer" ref={ref}>
			<ul>
				<li>
					<a href="/">Action</a>
				</li>
				<li>
					<a href="/">More</a>
				</li>
			</ul>
		</nav>
	);
};

export default SideDrawer;
