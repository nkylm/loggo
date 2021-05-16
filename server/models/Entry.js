const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
	activity: String,
	notes: String,
	date: Date,
	time: String,
	email: String,
});

module.exports = Entry = mongoose.model("entries", entrySchema);
