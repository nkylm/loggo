const express = require("express");
const moment = require("moment");
const router = express.Router();

const Entry = require("../models/Entry");

// Create entry
router.post("/", (req, res) => {
	Entry.create(req.body.entry)
		.then((entry) => res.json(entry))
		.catch((err) => console.log(err));
});

// Read entries
router.get("/", (req, res) => {
	if (req.query.date == undefined) {
		var dateQuery = {};
	} else {
		var dateQuery = {
			date: {
				$gte: req.query.date[0],
				$lte: req.query.date[1],
			},
		};
	}

	let activityQuery =
		req.query.activity == undefined ? {} : { activity: req.query.activity };

	Entry.find({ $and: [dateQuery, activityQuery] })
		.then((entries) => res.json(entries))
		.catch((err) => console.log(err));
});

// Update entry
router.patch("/", (req, res) => {
	Entry.findOneAndUpdate({ _id: req.body.id }, req.body.entry, {
		new: true,
	})
		.then((updatedEntry) => res.json(updatedEntry))
		.catch((err) => console.log(err));
});

// Delete entry
router.delete("/", (req, res) => {
	Entry.findOneAndDelete({ _id: req.query.id })
		.then((deletedEntry) => {
			res.json(deletedEntry);
		})
		.catch((err) => console.log(err));
});

module.exports = router;
