import logo from "./logo.svg"
import "./Header.css"
function Header() {
    return (
        <header className="main-header">
            <figure>
                <img src={logo} alt="logo meet het" />
            </figure>
            <h3>Welkom bij Meet Het</h3>
        </header>
    )
}

export default Header;
