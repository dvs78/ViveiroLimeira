import React from "react";
import logoTlVerdeClaro from "../assets/logo/logo_verde_claro.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img className="header__img" src={logoTlVerdeClaro} alt="" />
      </Link>

      <Link to="/" className="header__link">
        <h2>Viveiro</h2>
      </Link>
    </div>
  );
};

export default Header;
