import { useState, useEffect } from "react"
import "./FormulierTerugbrengen.css"
import { currentDate } from "./currentDate.js"
import { fetchNames } from "./fetchNames_Materials.js"
function FormulierTerugbrengen() {

    // react hooks to handle the state
    const [naam, setNaam] = useState("");
    const [materiaal, setMateriaal] = useState("");
    const [status, setStatus] = useState("ok");
    const [uitleg, setUitleg] = useState("");
    function changeNaam(event) {
        setNaam(event.target.value);
        fetchNames.materials(event.target.value, document.getElementById("materiaal"));
    }
    function changeStatus(event) {
        setStatus(event.target.value);
    }
    function changeUitleg(event) {
        setUitleg(event.target.value)
    }
    function changeMateriaalNaam(event) {
        setMateriaal(event.target.value)
    }
    // reset the state
    function resetState() {
        setNaam("");
        setStatus("ok");
        setUitleg("");
        setMateriaal("")
    }

    // using fetch to send the data to the backend
    async function sendData() {
        const res = await fetch("http://localhost:1000/formulier/terugbrengen", {
            method: "POST",
            body: JSON.stringify({
                naam: `${naam}`,
                materiaal: materiaal,
                datumTijd: currentDate,
                status: status,
                info: uitleg,
                "teruggebracht": "ja",
            }),
            headers: {
                "content-type": "application/json; charset=utf-8"
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
            const wrapper = document.querySelector(".terugbrengen-wrapper");
            wrapper.style.display = "none";
            resetState();
        }
    }
    // if there is any error, send it to the user
    function sendErrorMessage(message) {
        const messageBox = document.querySelector(".message1");
        if (message === "") {
            messageBox.innerHTML = "";
            return
        }
        messageBox.innerHTML = "";
        const divEl = document.createElement("div")
        divEl.textContent = `${message}`;
        messageBox.appendChild(divEl);

    }
    // display the textarea if the material is broken or lost
    useEffect(() => {
        const uitlegBox = document.getElementById("uitleg-section");
        const statusContainer = document.getElementById("status");
        if (status === "ok") {
            uitlegBox.style.display = "none";
            statusContainer.firstElementChild.selected = true;
        } else {
            uitlegBox.style.display = "initial"
        }
    });

    // cancel if user does not want to fill the form
    function cancel() {
        const wrapper = document.querySelector(".terugbrengen-wrapper");
        wrapper.style.display = "none";
        resetState();
        // just to clear the error box
        sendErrorMessage("");

    }
    return (
        <section className="terugbrengen-wrapper">
            <section className="container">
                <div className="label"><label htmlFor="naam-list">Kies uw naam</label></div>
                <select name="naam-list" id="naam-list" onChange={changeNaam}>
                    <option value="" >Kies uw naam</option>
                </select>
                <div className="label"><label htmlFor="materiaal-list">Materiaal</label></div>
                <select name="materiaal-list" id="materiaal" onChange={changeMateriaalNaam}>
                    <option value="" >Kies het materiaal</option>
                </select>
                <div className="label"><label htmlFor="status">De Status van het materiaal</label></div>
                <select name="status" id="status" onChange={changeStatus}>
                    <option value="ok">OK</option>
                    <option value="stuk">Stuk</option>
                    <option value="verloren">Verloren</option>
                </select>
                <section id="uitleg-section">
                    <p>Gelieve meer uitleg te geven wat met het materiaal gebeurd is</p>
                    <div>
                        <textarea name="uitleg" id="uitleg" value={uitleg} onChange={changeUitleg}></textarea>
                    </div>
                </section>
                <div className="button-container">
                    <button type="button" onClick={cancel}>Annuleer</button>
                    <button type="button" onClick={sendData}>Submit</button>
                </div>

            </section>
            <section className="message1">

            </section>
        </section>
    )
}

export default FormulierTerugbrengen;