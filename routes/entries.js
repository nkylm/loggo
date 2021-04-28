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
	const today = moment(new Date(req.query.date)).utcOffset("-00:00");

	Entry.find({
		date: {
			$gte: today.startOf("day").toDate(),
			$lte: today.endOf("day").toDate(),
		},
	})
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
