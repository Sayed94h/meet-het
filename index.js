"use strict";

const express = require("express");
const cors = require("cors");
const backend = require("./backend/index.js");
const app = express();
app.use(cors());
app.use(express.json());
// serve the client
app.use("/", express.static(__dirname + "/client/public"));
// for fall back
app.get("/", (req, res, next) => {
	res.sendFile(__dirname + "/client/public/index.html");
});
app.get("/test", (req, res) => {
	res.send("It works");
});
app.use("/formulier", backend);
app.listen(1000, (err) => {
	if (err) {
		console.error(err);
	} else {
		console.log("Listening to http://localhost:" + 1000);
	}
});
