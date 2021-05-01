import React, { useState, useContext, useEffect } from "react";
import XLSX from "xlsx";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { uploadFile } from "../api";
import Message from "../molecules/Message";
import Progress from "../molecules/Progress";

import { ThemeContext } from "../themeContext";
import "./upload.css";

const Upload = () => {
	const [file, setFile] = useState("");
	const [fileName, setFileName] = useState("Choose .xls file");
	const [uploadedFile, setUploadedFile] = useState({});
	const [message, setMessage] = useState("");
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [status, setStatus] = useState();

	const theme = useContext(ThemeContext);

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

	const onInputChange = (event) => {
		setFile(event.target.files[0]);
		setFileName(event.target.files[0].name);
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

	useEffect(() => {}, [uploadedFile]);

	const handleReplace = () => {};

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
					/>
					<label className="custom-file-label" htmlFor="customFile">
						{fileName}
					</label>
				</div>

				<Progress percentage={uploadPercentage} status={status} />

				<UploadButton type="submit">Upload</UploadButton>
			</form>

			<div>
				<Button onClick={handleReplace}>REPLACE EXISTING DATA</Button>
				<Button>UPDATE DATA</Button>
			</div>
		</div>
	);
};

export default Upload;
