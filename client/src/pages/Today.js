import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../themeContext";
import "./today.css";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";

import ActivityPopup from "../molecules/ActivityPopup";

import { createEntry, readEntries, updateEntry, deleteEntry } from "../api";

const Today = () => {
	let theme = useContext(ThemeContext);
	const [openPopup, setOpenPopup] = useState(false);
	const [editIndex, setEditIndex] = useState();
	const [date, setDate] = useState(
		(() => {
			return new Date().toLocaleDateString();
		})()
	);
	const [entries, setEntries] = useState([]);

	const prevEntries = usePrevious(entries);

	const AddActivityButton = withStyles({
		root: {
			background: theme.orange.dark,
			borderRadius: 3,
			border: 0,
			color: "white",
			height: 48,
			padding: "0 30px",
			margin: "3vh 0",
			"&:hover": {
				backgroundColor: "#fff",
				color: theme.orange.dark,
			},
		},
	})(Button);

	useEffect(() => {
		readEntries(date).then((res) => setEntries(res));
	}, []);

	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	useEffect(() => {
		if (
			prevEntries &&
			JSON.stringify(prevEntries) !== JSON.stringify(entries)
		) {
			readEntries(date).then((res) => setEntries(res));
		}
	}, [entries]);

	const handleAdd = () => {
		setEditIndex(null);
		setOpenPopup(true);
	};

	const handleEdit = (i) => {
		setEditIndex(i);
		setOpenPopup(true);
	};

	const handleDelete = (i) => {
		deleteEntry(entries[i]._id).then((res) => {
			let newEntries = [...entries];
			newEntries.splice(i, 1);
			setEntries(newEntries);
		});
	};

	const addEntry = (newEntry) => {
		createEntry(newEntry).then((res) => {
			let newEntries = [...entries];
			newEntries[newEntries.length] = res;
			setEntries(newEntries);
		});
	};

	const editEntry = (updatedEntry) => {
		updateEntry(entries[editIndex]._id, updatedEntry).then((res) => {
			let newEntries = [...entries];
			newEntries[editIndex] = res;
			setEntries(newEntries);
		});
	};

	const convertTo12 = (time) => {
		let splitTime = time.split(":");
		splitTime[0] -= 0;
		if (splitTime[0] > 12) {
			return `${splitTime[0] % 12}:${splitTime[1]} pm`;
		} else if (splitTime[0] == 0) {
			return `12:${splitTime[1]} am`;
		}
		return `${splitTime[0]}:${splitTime[1]} am`;
	};

	const capitaliseFirst = (text) => {
		return text[0].toUpperCase() + text.slice(1);
	};

	return (
		<div
			className="todayContainer"
			style={{ backgroundColor: theme.yellow.light }}
		>
			{openPopup && (
				<div id="activityPopup">
					<ActivityPopup
						addEntry={addEntry}
						editEntry={editEntry}
						setOpenPopup={setOpenPopup}
						entry={editIndex != null ? entries[editIndex] : null}
					/>
				</div>
			)}

			<AddActivityButton className="addActivityBtn" onClick={handleAdd}>
				Add Activity
			</AddActivityButton>

			<div className="todayDate" style={{ color: theme.blue.dark }}>
				{date}
			</div>

			<div className="activityList">
				{entries.map((entry, i) => {
					return (
						<div key={i}>
							<div className="activityNotes">
								<div id="activity">
									{capitaliseFirst(entry.activity)}
								</div>
								<div id="notes">{entry.notes}</div>
							</div>

							<div className="dateTime">
								<img
									width="25px"
									height="25px"
									src={editIcon}
									onClick={() => handleEdit(i)}
								/>

								<img
									width="25px"
									height="25px"
									src={deleteIcon}
									onClick={() => handleDelete(i)}
								/>
								<div>{convertTo12(entry.time)}</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Today;
