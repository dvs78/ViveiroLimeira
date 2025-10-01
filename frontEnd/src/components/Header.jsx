// Header.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoVerde from "../assets/logo/tlSolucoesAmbientaisVerde.png";

const Header = ({ truck, book, seedling, iconUser, iconCart }) => (
  <header className="header__index">
    <img src={logoVerde} alt="Logo tlSolucoesAmbientaisVerde" />
    <h1>VIVEIRO DE MUDAS DE CAFÉ</h1>

    <div>
      <FontAwesomeIcon className="header__icon " icon={truck} />
      <FontAwesomeIcon className="header__icon" icon={book} />
      <FontAwesomeIcon className="header__icon" icon={seedling} />
      <FontAwesomeIcon className="header__icon" icon={iconUser} />
      <button>
        <FontAwesomeIcon className="header__icon" icon={iconCart} />
      </button>
    </div>
  </header>
);

export default Header;
