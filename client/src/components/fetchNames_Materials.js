export const fetchNames = {
	names: async (parentEl) => {
		// fetch de namen van alle personen die materialen hebben geleend
		fetch(`http://localhost:1000/formulier/naamList`)
			.then((res) => {
				if (!res.ok || res.status !== 200) {
					console.error("Error from getting the names: ", res);
					return;
				}
				return res.json();
			})
			.then((data) => {
				parentEl.innerHTML = "";
				const baseOption = document.createElement("option");
				baseOption.value = ``;
				baseOption.textContent = `Kies uw naam`;
				parentEl.appendChild(baseOption);
				data.namen.forEach((item) => {
					const optionEl = document.createElement("option");
					optionEl.value = `${item}`;
					optionEl.textContent = `${item}`;
					parentEl.appendChild(optionEl);
				});
			})
			.catch((err) => {
				if (err) {
					console.error("Error from getting the names: ", err);
				}
			});
	},
	materials: (naam, parentEl) => {
		// fetch alle materialen die deze persoon heft geleend
		fetch(`http://localhost:1000/formulier/materiaalList/${naam}`)
			.then((res) => {
				if (!res.ok || res.status !== 200) {
					console.error("Error from getting the materials names: ", res);
					return;
				}
				return res.json();
			})
			.then((data) => {
				parentEl.innerHTML = "";
				const baseOption = document.createElement("option");
				baseOption.value = ``;
				baseOption.textContent = `Kies het materiaal`;
				parentEl.appendChild(baseOption);
				data.materialen.forEach((item) => {
					const optionEl = document.createElement("option");
					optionEl.value = `${item}`;
					optionEl.textContent = `${item}`;
					parentEl.appendChild(optionEl);
				});
				// return data.materialen;
			})
			.catch((err) => {
				if (err) {
					console.error("Error from getting the materials names: ", err);
				}
			});
	},
};
