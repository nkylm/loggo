const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const entries = require("./routes/entries");
const upload = require("./routes/upload");

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

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
app.use("/upload", upload);

app.listen(port, () => console.log(`Server started on port ${port}`));
