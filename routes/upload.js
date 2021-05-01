const express = require("express");
const path = require("path");
const router = express.Router();

router.post("/", (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: "No file was uploaded." });
	}

	const file = req.files.file;

	file.mv(
		`${path.join(__dirname, "../")}/client/public/uploads/${file.name}`,
		(err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}

			res.json({
				fileName: file.name,
				filePath: `/uploads/${file.name}`,
			});
		}
	);
});

module.exports = router;
