import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Today from "./pages/Today";
import Nav from "./molecules/Nav";
import "./global.css";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Nav />
			<Switch>
				<Route path="/today" component={Today}></Route>
			</Switch>
		</Router>
	);
}

export default App;
