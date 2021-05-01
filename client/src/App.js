import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Daily from "./pages/Daily";
import History from "./pages/History";
import Upload from "./pages/Upload";
import Nav from "./molecules/Nav";
import "./global.css";

export const history = createBrowserHistory();

function App() {
	return (
		<Router history={history}>
			<Nav />
			<Switch>
				<Route path="/daily" component={Daily}></Route>
			</Switch>
			<Switch>
				<Route path="/history" component={History}></Route>
			</Switch>
			<Switch>
				<Route path="/upload" component={Upload}></Route>
			</Switch>
		</Router>
	);
}

export default App;
