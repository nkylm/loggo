import React, { useState, useContext, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import moment from "moment";
import XLSX from "xlsx";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import {
	uploadFile,
	deleteCollection,
	addCollection,
	deleteFile,
} from "../api";
import Message from "../molecules/Message";
import Progress from "../molecules/Progress";
import Loading from "../molecules/Loading";

import TemplatePreview from "../images/Log Template Preview.png";

import { ThemeContext } from "../themeContext";
import "./upload.css";
import { GetApp } from "@material-ui/icons";

const Upload = ({
	file,
	setFile,
	fileName,
	setFileName,
	uploadedFile,
	setUploadedFile,
	fileData,
	setFileData,
}) => {
	const [message, setMessage] = useState("");
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [status, setStatus] = useState();
	const { user } = useAuth0();

	const theme = useContext(ThemeContext);

	const UTC_OFFSET = -20;

	const UploadButton = withStyles({
		root: {
			background: theme.orange.dark,
			borderRadius: 3,
			border: 0,
			color: "white",
			height: 48,
			width: "100%",
			padding: "0 30px",
			margin: "2vh 0",
			"&:hover": {
				backgroundColor: "#fff",
				color: theme.orange.dark,
			},
		},
	})(Button);

	const DataButton = withStyles({
		root: {
			background: theme.yellow.dark,
			borderRadius: 3,
			border: 0,
			color: "white",
			height: 48,
			width: "30%",
			padding: "0 30px",
			margin: "2vh 0",
			"&:hover": {
				backgroundColor: "#fff",
				color: theme.yellow.dark,
			},
		},
	})(Button);

	const DownloadButton = withStyles({
		root: {
			background: theme.green.light,
			borderRadius: 3,
			border: 0,
			color: "white",
			height: 48,
			width: "30%",
			padding: "0 30px",
			margin: "0",
			"&:hover": {
				backgroundColor: "#fff",
				color: theme.green.light,
			},
		},
	})(Button);

	const onInputChange = (event) => {
		if (event.target.files.length > 0) {
			setFile(event.target.files[0]);
			setFileName(event.target.files[0].name);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", file);

		uploadFile(formData, setUploadPercentage)
			.then((res) => {
				const { fileName, filePath } = res.data;
				setUploadedFile({ fileName, filePath });
				setMessage("File uploaded successfully.");
				setStatus(200);
			})
			.catch((err) => {
				setStatus(err.response.status);
				if (err.response.status == 500) {
					setMessage("There was a problem with the server.");
				} else {
					setMessage(err.response.data.msg);
				}
			});
	};

	// serialDate is whole number of days since Dec 30, 1899
	// offsetUTC is -(24 - your timezone offset)
	const serialDateToJSDate = (serialDate, offsetUTC) => {
		let jsDate = new Date(Date.UTC(0, 0, serialDate, offsetUTC));
		return moment(new Date(jsDate))
			.utcOffset("-00:00")
			.format("yyyy-MM-DD");
	};

	useEffect(() => {
		let isMounted = true;
		if (Object.keys(uploadedFile).length != 0) {
			let req = new XMLHttpRequest();
			req.open("GET", `/app/${uploadedFile.filePath}`, false);
			req.send(null);

			let formattedFileData = [];
			console.log(req);
			let uploadedFileData = JSON.parse(req.responseText);
			uploadedFileData.forEach((entry) => {
				let newEntry = {};
				// format fileData dates
				newEntry["date"] = serialDateToJSDate(entry.Date, UTC_OFFSET);

				let entryHour = Math.floor(entry.Time * 24);
				let entryMinutes = Math.round(((entry.Time * 24) % 1) * 60);
				newEntry["time"] = `${entryHour}:${entryMinutes}`;

				// lowercase keys
				newEntry["activity"] = entry.Activity;
				newEntry["notes"] = entry.Notes;
				formattedFileData.push(newEntry);

				newEntry["email"] = user.email;
			});
			if (isMounted) setFileData(formattedFileData);
		}
		return () => {
			isMounted = false;
		};
	}, [uploadedFile]);

	const handleReplaceData = () => {
		deleteCollection(user.email).then((res) => {
			addCollection(fileData);
		});
		deleteFile(uploadedFile.filePath);
		setFile("");
		setFileName("Choose .xls or .xslx file");
		setUploadedFile({});
		setFileData([]);
	};

	const handleUpdateData = () => {
		addCollection(fileData);
		deleteFile(uploadedFile.filePath);
		setFile("");
		setFileName("Choose .xls or .xslx file");
		setUploadedFile({});
		setFileData([]);
	};

	const handleDownload = () => {
		let a = document.createElement("a");
		a.href = "downloads/Log Template.xlsx";
		a.setAttribute("download", "Log Template.xlsx");
		a.click();
	};

	return (
		<div className="uploadContainer">
			<div className="messageContainer">
				{message && <Message msg={message} />}
			</div>

			<form className="fileInput" onSubmit={onSubmit}>
				<div className="custom-file">
					<input
						type="file"
						className="custom-file-input"
						accept=".xls, .xlsx"
						id="customFile"
						onChange={onInputChange}
						onClick={(event) => {
							event.target.value = "";
						}}
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{fileName}
					</label>
				</div>

				<Progress percentage={uploadPercentage} status={status} />

				<UploadButton type="submit">Upload</UploadButton>
			</form>

			{fileData.length !== 0 && (
				<div className="dataButtonContainer">
					<DataButton onClick={handleReplaceData}>
						REPLACE EXISTING DATA
					</DataButton>
					<DataButton onClick={handleUpdateData}>
						ADD TO EXISTING DATA
					</DataButton>
				</div>
			)}

			<div className="templateContainer">
				<div>
					<p id="templateText">Template</p>
					<img width="90%" src={TemplatePreview} />
				</div>

				<DownloadButton
					startIcon={<GetAppIcon />}
					onClick={handleDownload}
				>
					Download template
				</DownloadButton>
			</div>
		</div>
	);
};

export default withAuthenticationRequired(Upload, {
	onRedirecting: () => <Loading />,
});
