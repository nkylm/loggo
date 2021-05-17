import React from "react";
import LoginButton from "../molecules/LoginButton";
import "./login.css";
import Logo from "../images/logo.png";

const Login = () => {
	return (
		<div className="background">
			<img src={Logo} className="logo" />
			<div className="loginBtnContainer">
				<button
					className="gitHub btn btn-secondary btn-lg"
					onClick={(e) => {
						e.preventDefault();
						window.open("https://github.com/nkylm/loggo", "_blank");
					}}
				>
					GitHub
				</button>
				<LoginButton />
			</div>
		</div>
	);
};

export default Login;
