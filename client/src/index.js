import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Auth0Provider } from "@auth0/auth0-react";

const currentDomain = "http://localhost:3000";

ReactDOM.render(
	<Auth0Provider
		domain="loggo.us.auth0.com"
		clientId="oBVOt49DbmVeyo07kAZ11hay3GxPqYT1"
		redirectUri={`${currentDomain}/daily`}
	>
		<App />
	</Auth0Provider>,
	document.getElementById("root")
);
