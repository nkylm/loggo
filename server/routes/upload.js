const express = require("express");
const path = require("path");
const router = express.Router();
const XLSX = require("xlsx");
const fs = require("fs");

router.post("/", (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "No file was uploaded." });
	}

	const file = req.files.file;
	let convertedFile = XLSX.read(file.data);
	const convertedFileName = convertedFile.SheetNames[0];
	const convertedFileSheet = convertedFile.Sheets[convertedFileName];
	const data = XLSX.utils.sheet_to_json(convertedFileSheet);

	res.json({
		fileName: file.name,
		data: data,
	});
});

module.exports = router;
