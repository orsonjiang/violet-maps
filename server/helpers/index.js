const sendError = (res, msg = "No more information can be provided at the time.", status = 400) => {
	return res
		.status(status)
		.json({ error: msg });
};

module.exports = {
	sendError,
};