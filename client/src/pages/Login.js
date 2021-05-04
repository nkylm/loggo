import React from "react";
import LoginButton from "../molecules/LoginButton";
import "./login.css";
import Logo from "../images/logo.png";

const Login = () => {
	return (
		<div className="background">
			<img src={Logo} className="logo" />
			<LoginButton />
		</div>
	);
};

export default Login;
