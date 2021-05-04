import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<button
			className="logIn btn btn-secondary btn-lg"
			onClick={() => loginWithRedirect()}
		>
			LOG IN
		</button>
	);
};

export default LoginButton;
