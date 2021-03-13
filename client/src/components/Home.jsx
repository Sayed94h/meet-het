import FormulierAfhalen from "./FormulierAfhalen.jsx"
import FormulierTerugbrengen from "./FormulierTerugbrengen.jsx"
import { fetchNames } from "./fetchNames_Materials.js"
import "./Home.css"
function Home() {
    function displayWrapper(afTerug) {
        if (afTerug === "afhalen") {
            // clear the error box if there is any
            const messageBox = document.querySelector(".message2");
            messageBox.textContent = "";
            // display the form "afhalen" to the user
            const wrapper = document.querySelector(".afhalen-wrapper");
            wrapper.style.display = "initial"
        } else {
            // display the form "terugbrengen" to the user
            const wrapper = document.querySelector(".terugbrengen-wrapper");
            wrapper.style.display = "initial";
            // fetch the name list
            fetchNames.names(document.getElementById('naam-list'));
            // clear the error box if there is any
            const messageBox = document.querySelector(".message1");
            messageBox.textContent = "";
        }

    }
    return (
        <section className="home-wrapper">
            <header>
                <p>U kunt het volgende formulier invullen wanneer u een materiaal afhaalt of wanneer u een materiaal terugbrengt.</p>
                <p>Komt u om een materiaal af te halen? Dan klik op de knop <span className="dark">Materiaal Afhahel</span>,
                Hebt u een materiaal teruggebracht? Dan klik op de knop <span className="dark">Materiaal Terugbrengen</span> om het juiste formulier in te vullen.</p>
            </header>
            <section className="button-container">
                <button onClick={() => { displayWrapper("afhalen") }}>Materiaal Afhalen</button>
                <button onClick={displayWrapper}>Materiaal Terugbrengen</button>
            </section>
            <FormulierAfhalen />
            <FormulierTerugbrengen />

        </section>
    )
}

export default Home;