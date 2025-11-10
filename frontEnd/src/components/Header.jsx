// // Header.jsx
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link, useNavigate } from "react-router-dom";
// import logoVerde from "../assets/logo/tlSolucoesAmbientaisVerde.png";

// const Header = ({
//   titulo,
//   truck,
//   book,
//   seedling,
//   iconUser,
//   iconCart,
//   faFilter,
// }) => {
//   const navigate = useNavigate();

//   return (
//     <header className="header__index">
//       {/* Clicar no logo volta pra Home */}
//       <button onClick={() => navigate("/")}>
//         <img src={logoVerde} alt="Logo TL Soluções Ambientais Verde" />
//       </button>

//       <h1>{titulo}</h1>

//       <div>
//         <FontAwesomeIcon className="header__icon" icon={truck} />
//         <FontAwesomeIcon className="header__icon" icon={book} />
//         <Link to="/mudas">
//           <FontAwesomeIcon className="header__icon" icon={seedling} />
//         </Link>
//         <FontAwesomeIcon className="header__icon" icon={iconUser} />
//         <button>
//           <FontAwesomeIcon className="header__icon" icon={faFilter} />
//         </button>

//         <button>
//           <FontAwesomeIcon className="header__icon" icon={iconCart} />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

// Header.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import logoVerde from "../assets/logo/tlSolucoesAmbientaisVerde.png";

const Header = ({
  titulo,
  truck,
  book,
  seedling,
  iconUser,
  iconCart,
  faFilter, // <- ícone vindo do pai
  onFilterClick, // <- callback para abrir/fechar filtros
}) => {
  const navigate = useNavigate();

  return (
    <header className="header__index">
      <button onClick={() => navigate("/")}>
        <img src={logoVerde} alt="Logo TL Soluções Ambientais Verde" />
      </button>

      <h1>{titulo}</h1>

      <div>
        {/* Botão de filtro no topo */}
        {faFilter && (
          <button onClick={onFilterClick} title="Filtrar">
            <FontAwesomeIcon className="header__icon" icon={faFilter} />
          </button>
        )}

        {/* os demais ícones, se quiser manter */}
        {truck && <FontAwesomeIcon className="header__icon" icon={truck} />}
        {book && <FontAwesomeIcon className="header__icon" icon={book} />}
        {seedling && (
          <Link to="/mudas">
            <FontAwesomeIcon className="header__icon" icon={seedling} />
          </Link>
        )}
        {iconUser && (
          <FontAwesomeIcon className="header__icon" icon={iconUser} />
        )}
        {iconCart && (
          <button>
            <FontAwesomeIcon className="header__icon" icon={iconCart} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
