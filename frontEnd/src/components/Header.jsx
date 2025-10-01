// Header.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import logoVerde from "../assets/logo/tlSolucoesAmbientaisVerde.png";

const Header = ({ titulo, truck, book, seedling, iconUser, iconCart }) => {
  const navigate = useNavigate();

  return (
    <header className="header__index">
      {/* Clicar no logo volta pra Home */}
      <button onClick={() => navigate("/")}>
        <img src={logoVerde} alt="Logo TL Soluções Ambientais Verde" />
      </button>

      <h1>{titulo}</h1>

      <div>
        <FontAwesomeIcon className="header__icon" icon={truck} />
        <FontAwesomeIcon className="header__icon" icon={book} />
        <Link to="/mudas">
          <FontAwesomeIcon className="header__icon" icon={seedling} />
        </Link>
        <FontAwesomeIcon className="header__icon" icon={iconUser} />
        <button>
          <FontAwesomeIcon className="header__icon" icon={iconCart} />
        </button>
      </div>
    </header>
  );
};

export default Header;
