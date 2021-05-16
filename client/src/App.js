import React, { useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./pages/Home";
import Daily from "./pages/Daily";
import History from "./pages/History";
import Upload from "./pages/Upload";
import Nav from "./molecules/Nav";
import Login from "./pages/Login";
import Loading from "./molecules/Loading";
import "./global.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export const history = createBrowserHistory();

function App() {
	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState("Choose .xls or .xlsx file");
	const [uploadedFile, setUploadedFile] = useState({});
	const [fileData, setFileData] = useState([]);

	const ProtectedRoute = ({ component, ...args }) => (
		<Route
			component={withAuthenticationRequired(component, {
				onRedirecting: () => <Loading />,
			})}
			{...args}
		/>
	);

	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" component={Login} />
				<>
					<Nav />
					<ProtectedRoute exact path="/daily" component={Daily} />
					<ProtectedRoute exact path="/history" component={History} />
					<Route
						exact
						path="/upload"
						render={(props) => (
							<Upload
								{...props}
								file={file}
								setFile={setFile}
								fileName={fileName}
								setFileName={setFileName}
								uploadedFile={uploadedFile}
								setUploadedFile={setUploadedFile}
								fileData={fileData}
								setFileData={setFileData}
							/>
						)}
					/>
				</>
			</Switch>
		</Router>
	);
}

export default App;
