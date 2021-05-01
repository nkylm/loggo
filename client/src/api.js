import Axios from "axios";

let currentDomain = "http://localhost:5000";

export const createEntry = (entry) => {
	return Axios.post(`${currentDomain}/entries`, { entry }).then((res) => {
		return res.data;
	});
};

export const readEntries = (date, activity) => {
	return Axios.get(`${currentDomain}/entries`, {
		params: { date, activity },
	}).then((res) => {
		return res.data;
	});
};

export const updateEntry = (id, entry) => {
	return Axios.patch(`${currentDomain}/entries`, { entry, id }).then(
		(res) => {
			return res.data;
		}
	);
};

export const deleteEntry = (id) => {
	return Axios.delete(`${currentDomain}/entries`, { params: { id } }).then(
		(res) => {
			return res.data;
		}
	);
};

export const uploadFile = (formData, setUploadPercentage) => {
	return Axios.post(`${currentDomain}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress: (progressEvent) => {
			setUploadPercentage(
				parseInt(
					Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					)
				)
			);
		},
	});
};
