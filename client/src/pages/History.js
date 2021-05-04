import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import moment from "moment";
import ReactDOM from "react-dom";
import Chart from "react-apexcharts";

import { ThemeContext } from "../themeContext";
import { ConstantContext } from "../constantContext";

import { Select, MenuItem, TextField } from "@material-ui/core";

import { readEntries } from "../api";

import "./history.css";

const WEEKDAYS = ["Sat", "Fri", "Thu", "Wed", "Tue", "Mon", "Sun"];
const WEEKDAYS_LONG = [
	"Saturday",
	"Friday",
	"Thursday",
	"Wednesday",
	"Tuesday",
	"Monday",
	"Sunday",
];
const TIMES = [
	"12 AM",
	"1 AM",
	"2 AM",
	"3 AM",
	"4 AM",
	"5 AM",
	"6 AM",
	"7 AM",
	"8 AM",
	"9 AM",
	"10 AM",
	"11 AM",
	"12 PM",
	"1 PM",
	"2 PM",
	"3 PM",
	"4 PM",
	"5 PM",
	"6 PM",
	"7 PM",
	"8 PM",
	"9 PM",
	"10 PM",
	"11 PM",
];

const History = () => {
	let theme = useContext(ThemeContext);
	let constants = useContext(ConstantContext);

	const { user } = useAuth0();

	const [series, setSeries] = useState([]);
	const [activity, setActivity] = useState("");
	const [startDate, setStartDate] = useState(
		(() => {
			let newDate = new Date();
			return moment
				.utc(newDate.setMonth(newDate.getMonth() - 1))
				.format("YYYY-MM-DD");
		})()
	);
	const [endDate, setEndDate] = useState(
		(() => {
			return moment.utc(new Date()).format("YYYY-MM-DD");
		})()
	);
	const [dateError, setDateError] = useState(false);
	const [options, setOptions] = useState({
		chart: {
			toolbar: {
				show: false,
			},
			height: "100%",
			type: "heatmap",
			animations: {
				enabled: true,
				easing: "easeinout",
				speed: 300,
				dynamicAnimation: {
					enabled: true,
					speed: 150,
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			heatmap: {
				colorScale: {
					ranges: [
						{
							from: 0,
							to: 0,
							color: "#e6e6e6",
						},
					],
				},
			},
		},
		colors: [theme.orange.dark],
		grid: {
			padding: {
				top: 0,
				right: 50,
				bottom: 0,
				left: 25,
			},
		},
		legend: {
			show: false,
		},
	});

	const handleActivityChange = (event) => {
		setActivity(event.target.value);
	};

	const handleStartDateChange = (event) => {
		setStartDate(event.target.value);
	};

	const handleEndDateChange = (event) => {
		setEndDate(event.target.value);
	};

	const findActiveDay = (series) => {
		let totalCount = [];
		series.forEach((day) => {
			totalCount.push(
				day.data.reduce((a, b) => {
					return a + b.y;
				}, 0)
			);
		});

		if (Math.max(...totalCount) == 0) {
			return "N/A";
		}

		let maxCount = Math.max(...totalCount);
		let activeDays = [];

		for (let i = 0; i < totalCount.length; i++) {
			if (totalCount[i] == maxCount) activeDays.push(WEEKDAYS_LONG[i]);
		}

		return activeDays.join(", ");
	};

	const findActiveTime = (series) => {
		let totalCount = [];
		let timeArr = [];
		for (let i = 0; i < TIMES.length; i++) {
			let tempArr = [];
			series.forEach((day) => {
				tempArr.push(day.data[i]);
			});
			timeArr.push(tempArr);
		}
		timeArr.forEach((time) => {
			totalCount.push(
				time.reduce((a, b) => {
					return a + b.y;
				}, 0)
			);
		});

		if (Math.max(...totalCount) == 0) {
			return "N/A";
		}

		let maxCount = Math.max(...totalCount);
		let activeTimes = [];

		for (let i = 0; i < totalCount.length; i++) {
			if (totalCount[i] == maxCount) activeTimes.push(TIMES[i]);
		}
		return activeTimes.join(", ");
	};

	useEffect(() => {
		let startDay = moment(startDate)
			.utcOffset("-04:00")
			.add(-1, "days")
			.startOf("day")

			.toDate();
		let endDay = moment(endDate)
			.utcOffset("-04:00")
			.add(-1, "days")
			.endOf("day")
			.toDate();
		startDay > endDay ? setDateError(true) : setDateError(false);

		readEntries([startDay, endDay], activity, user.email).then(
			(entries) => {
				let newSeries = [];
				for (let i = 0; i < WEEKDAYS.length; i++) {
					newSeries.push({ name: WEEKDAYS[i], data: [] });
					for (let j = 0; j < 24; j++) {
						newSeries[i].data.push({ x: TIMES[j], y: 0 });
					}
				}
				entries.forEach((entry, i) => {
					let entryDate = new Date(entry.date);

					newSeries[
						WEEKDAYS.indexOf(
							entryDate.toUTCString().substring(0, 3)
						)
					].data[entry.time.split(":")[0] - 0].y++;
				});

				setSeries(newSeries);
			}
		);
	}, [activity, startDate, endDate]);

	return (
		<div className="historyContainer">
			<div className="historyTopBar">
				<div>
					<Select
						value={activity}
						onChange={handleActivityChange}
						displayEmpty
					>
						<MenuItem value="" disabled>
							Event
						</MenuItem>
						{constants.EVENTS.map((event, i) => {
							return (
								<MenuItem value={event.toLowerCase()} key={i}>
									{event}
								</MenuItem>
							);
						})}
					</Select>
				</div>

				<div className="durationPickerContainer">
					<TextField
						id="dateField"
						label="Start Date"
						type="date"
						error={dateError}
						value={startDate}
						onChange={handleStartDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						id="dateField"
						label="End Date"
						type="date"
						error={dateError}
						value={endDate}
						onChange={handleEndDateChange}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</div>
			</div>

			<div className="heatmapContainer">
				{series.length > 0 && (
					<Chart
						options={options}
						series={series}
						type="heatmap"
						height="100%"
					/>
				)}
			</div>

			<div className="historyStatistics">
				<p>Most active day(s): {findActiveDay(series)}</p>
				<p>Most active time(s): {findActiveTime(series)}</p>
			</div>
		</div>
	);
};

export default History;
