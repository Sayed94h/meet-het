import { useState } from "react"
import "./FormulierAfhalen.css"
import { currentDate } from "./currentDate.js"
function FormulierAfhalen() {
    // react hooks to handle the state of the component
    const [voorNaam, setVoorNaam] = useState("");
    const [achterNaam, setAchterNaam] = useState("");
    const [materiaal, setMateriaal] = useState("");
    function changeVoorNaam(event) {
        setVoorNaam(event.target.value)
    }
    function changeAchterNaam(event) {
        setAchterNaam(event.target.value)
    }
    function changeMateriaalNaam(event) {
        setMateriaal(event.target.value)
    }
    // reset the state
    function resetState() {
        setVoorNaam("");
        setAchterNaam("");
        setMateriaal("")
    }
    // send data to the server
    async function sendData() {
        const res = await fetch("/formulier/afhalen", {
            method: "POST",
            body: JSON.stringify({
                naam: `${voorNaam} ${achterNaam}`,
                "materiaal": materiaal,
                datumTijd: currentDate,
                "teruggebracht": "neen",
            }),
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        });
        if (!res.ok || res.status !== 200) {
            console.error('Error at sending data: ', res);
            return
        };
        const feedback = await res.json();
        if (feedback.message !== "") {
            sendErrorMessage(feedback.message);
        } else {
            const wrapper = document.querySelector(".afhalen-wrapper");
            wrapper.style.display = "none";
            // just to clear the error box if there is any
            sendErrorMessage("");
            // reset the state
            resetState();
        }
    }
    // handle error messages and send messages to users if there is any
    function sendErrorMessage(message) {
        const messageBox = document.querySelector(".message2");
        if (message === "") {
            messageBox.innerHTML = "";
            return
        }
        messageBox.innerHTML = "";
        const divEl = document.createElement("div")
        divEl.textContent = `${message}`;
        messageBox.appendChild(divEl);
    }
    // cancel if user does not want to fill the form
    function cancel() {
        const wrapper = document.querySelector(".afhalen-wrapper");
        wrapper.style.display = "none";
        resetState();
        // just to clear the error box
        sendErrorMessage("");

    }
    return (
        <section className="afhalen-wrapper">
            <section className="container">
                <div className="label"><label htmlFor="voor-naam">Voor Naam</label></div>
                <input type="text" id="voor-naam" value={voorNaam} placeholder="bvb: Arthur" onChange={changeVoorNaam} />
                <div className="label"><label htmlFor="achter-naam">Achter Naam</label></div>
                <input type="text" id="achter-naam" value={achterNaam} placeholder="bvb: Van Kouter" onChange={changeAchterNaam} />
                <div className="label"><label htmlFor="materialen">Materiaal</label></div>
                <select name="materiaal" id="materialen" onChange={changeMateriaalNaam}>
                    <option value="">Kies een materiaal</option>
                    <option value="Meterriss mini-prisma 17.5 mm magnetisch RSMP390M">Meterriss mini-prisma 17.5 mm magnetisch RSMP390M</option>
                    <option value="Leica valstok GLS12 metaal uitschuifbaar met klik">Leica valstok GLS12 metaal uitschuifbaar met klik</option>
                    <option value="Leica prisma-adapter GRT144">Leica prisma-adapter GRT144</option>
                    <option value="Seco bipod">Seco bipod</option>
                    <option value="Lasertracker AT403">Lasertracker AT403</option>
                    <option value="Leica RTC 3D">Leica RTC 3D</option>
                    <option value="Leica LS15">Leica LS15</option>
                    <option value="NavVis VLX">NavVis VLX</option>
                    <option value="RST MEMS Vertical Inclinometer System">RST MEMS Vertical Inclinometer System</option>
                </select>
                <div className="button-container">
                    <button type="button" onClick={cancel}>Annuleer</button>
                    <button type="button" onClick={sendData}>Submit</button>
                </div>

            </section>
            <section className="message2">
            </section>
        </section>
    )
}

export default FormulierAfhalen;