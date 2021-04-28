import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import "./activityPopup.css";
import { ThemeContext } from "../themeContext";

import {
	TextField,
	Button,
	Select,
	InputLabel,
	Input,
	FormControl,
	MenuItem,
	FormHelperText,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

const ActivityPopup = ({ addEntry, editEntry, setOpenPopup, entry }) => {
	let theme = useContext(ThemeContext);
	const [activity, setActivity] = useState("");
	const [notes, setNotes] = useState("");
	const [dateTime, setDateTime] = useState(
		(() => {
			// "2017-05-24";
			let newDate = new Date();
			newDate.setMinutes(
				newDate.getMinutes() - newDate.getTimezoneOffset()
			);
			let date = newDate.toISOString().split("T");
			date[1] = date[1].substr(0, 5);

			return [date[0], date[1]];
		})()
	);
	const [showRequired, setShowRequired] = useState(false);

	const SaveButton = withStyles({
		root: {
			background: theme.blue.dark,
			borderRadius: 3,
			border: 0,
			color: "white",
			height: 48,
			padding: "0 30px",
			marginBottom: "5vh",
			"&:hover": {
				backgroundColor: "#fff",
				color: theme.blue.dark,
			},
		},
	})(Button);

	useEffect(() => {
		if (entry != null) {
			setActivity(entry.activity);
			setNotes(entry.notes);
			setDateTime([entry.date.split("T")[0], entry.time]);
		}
	}, []);

	const handleClose = () => {
		setOpenPopup(false);
	};

	const handleSave = () => {
		if (activity != "") {
			setOpenPopup(false);
			let newEntry = {
				activity,
				notes,
				date: dateTime[0],
				time: dateTime[1],
			};
			if (entry != null) {
				editEntry(newEntry);
			} else {
				addEntry(newEntry);
			}
		} else {
			setShowRequired(true);
		}
	};

	const handleActivityChange = (event) => {
		setActivity(event.target.value);
	};

	const handleNotesChange = (event) => {
		setNotes(event.target.value);
	};

	const handleDateChange = (event) => {
		setDateTime([event.target.value, dateTime[1]]);
	};

	const handleTimeChange = (event) => {
		setDateTime([dateTime[0], event.target.value]);
	};

	return (
		<div className="overlay">
			<div className="popup">
				<button className="closeIcon" onClick={handleClose}>
					<CloseIcon style={{ htmlColor: theme.blue.dark }} />
				</button>
				<div className="popupRow" id="activityDropdown">
					<FormControl error={showRequired}>
						<Select
							value={activity}
							onChange={handleActivityChange}
							displayEmpty
						>
							<MenuItem value="" disabled>
								Activity
							</MenuItem>
							<MenuItem value={"eat"}>Eat</MenuItem>
							<MenuItem value={"drink"}>Drink</MenuItem>
							<MenuItem value={"pee"}>Pee</MenuItem>
							<MenuItem value={"poop"}>Poop</MenuItem>
							<MenuItem value={"sleep"}>Sleep</MenuItem>
							<MenuItem value={"exercise"}>Exercise</MenuItem>
							<MenuItem value={"treat"}>Treat</MenuItem>
						</Select>
						{showRequired && (
							<FormHelperText>Required</FormHelperText>
						)}
					</FormControl>
				</div>

				<div className="popupRow" id="notesFieldContainer">
					<p>Notes</p>
					<TextField
						className="notesField"
						value={notes}
						multiline
						rowsMax={4}
						variant="filled"
						onChange={handleNotesChange}
					/>
				</div>

				<div className="popupRow">
					<TextField
						id="dateField"
						label="Date"
						type="date"
						value={dateTime[0]}
						onChange={handleDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="timeField"
						label="Time"
						type="time"
						value={dateTime[1]}
						onChange={handleTimeChange}
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{
							step: 300,
						}}
					/>
				</div>
				<div className="popupRow">
					<SaveButton
						variant="contained"
						background={theme.blue.dark}
						size="large"
						startIcon={<DoneIcon />}
						onClick={handleSave}
					>
						Save
					</SaveButton>
				</div>
			</div>
		</div>
	);
};

export default ActivityPopup;
