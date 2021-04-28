const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");

const entries = require("./routes/entries");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const db = config.get("mongoURI");

mongoose
	.connect(db, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("MongoDB connected at " + db))
	.catch((err) => console.log(err));

app.use("/entries", entries);

app.listen(port, () => console.log(`Server started on port ${port}`));
