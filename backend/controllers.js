"use strict";
const path = require("path");
const DataPath = path.join(__dirname, "..", "/data/materialen.json");
const terugGebracht = path.join(__dirname, "..", "/data/teruggebracht.json");
const fs = require("fs");
const handler = {
	naamList: async (req, res) => {
		// verzend de namen van de personen die al materialen geleend hebben

		fs.readFile(DataPath, "utf-8", (err, data) => {
			//if error
			if (err) {
				console.error(err);
				return;
			}
			const parsedData = JSON.parse(data);
			const namen = [];

			for (let i = 0; i < parsedData.materialen.length; i++) {
				let item = parsedData.materialen[i].naam;
				if (!namen.includes(item)) {
					namen.push(item);
				}
			}

			res.json({
				namen: namen,
			});
		});
	},
	materiaalList: async (req, res) => {
		// verzend de namen van al materialen die al geleend zijn door de specifieke persoon
		const persoon = req.params.naam;
		fs.readFile(DataPath, "utf-8", (err, data) => {
			//if error
			if (err) {
				console.error(err);
				return;
			}
			const parsedData = JSON.parse(data);
			const materialen = [];
			for (let i = 0; i < parsedData.materialen.length; i++) {
				const item_persson = parsedData.materialen[i].naam;
				const item_materiaal = parsedData.materialen[i].materiaal;
				if (item_persson === persoon) {
					if (!materialen.includes(item_materiaal)) {
						materialen.push(item_materiaal);
					}
				}
			}
			res.json({
				materialen: materialen,
			});
		});
	},
	afhalen: async (req, res) => {
		const formData = await req.body;
		// if the form is empty
		if (formData.naam === "" || formData.materiaal === "") {
			res.send({
				message:
					"Gelieve uw voornaam, achternaam en de naam van het materiaal in te vullen",
			});
			return;
		}
		fs.readFile(DataPath, "utf-8", (err, data) => {
			//if error
			if (err) {
				console.error(err);
				res.send({
					message: "Probeer het nog een keer",
				});
				return;
			}
			const parsedData = JSON.parse(data);
			formData.id = parsedData.nextId;
			parsedData.nextId++;
			parsedData.materialen.push(formData);
			const toWrite = JSON.stringify(parsedData, null, " ");
			fs.writeFile(DataPath, toWrite, (err) => {
				if (err) {
					console.error("Error at saving the data", err);
					res.send({
						message: "Probeer het nog een keer",
					});
					return;
				}
				res.send({
					message: "",
				});
			});
		});
	},
	terugbrengen: async (req, res) => {
		const formData = await req.body;
		// if the form is empty
		if (formData.naam === "" || formData.materiaal === "") {
			res.send({
				message:
					"Gelieve uw voornaam, achternaam en de naam van het materiaal in te vullen",
			});
			return;
		}

		fs.readFile(terugGebracht, "utf-8", (err, data) => {
			//if error
			if (err) {
				console.error(err);
				res.send({
					message: "Probeer het nog een keer",
				});
				return;
			}
			const parsedData = JSON.parse(data);
			formData.id = parsedData.nextId;
			parsedData.nextId++;
			parsedData.materialen.push(formData);
			const toWrite = JSON.stringify(parsedData, null, " ");
			fs.writeFile(terugGebracht, toWrite, (err) => {
				if (err) {
					console.error("Error at saving the data", err);
					res.send({
						message: "Probeer het nog een keer",
					});
					return;
				}
				// if no error, remove the material from the database of borrowed materials
				fs.readFile(DataPath, "utf-8", (err, data) => {
					//if error
					if (err) {
						console.error(err);
						res.send({
							message: "Probeer het nog een keer",
						});
						return;
					}
					const parsedData = JSON.parse(data);
					let indexOfMatch;
					parsedData.materialen.forEach((element, ind) => {
						if (
							element.naam === formData.naam &&
							element.materiaal === formData.materiaal
						) {
							indexOfMatch = ind;
						}
					});
					parsedData.materialen.splice(indexOfMatch, 1);
					const toWrite = JSON.stringify(parsedData, null, " ");
					fs.writeFile(DataPath, toWrite, (err) => {
						if (err) {
							console.error("Error at saving the data", err);
							res.send({
								message: "Probeer het nog een keer",
							});
							return;
						}
						res.send({
							message: "",
						});
					});
				});
			});
		});
	},
};
module.exports = handler;
