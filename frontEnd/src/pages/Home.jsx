import CardMuda from "../components/CardMuda";
import Header from "../components/Header";

import {
  faTruck,
  faBook,
  faSeedling,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <Header
        titulo="Viveiro de Mudas de Café"
        truck={faTruck}
        book={faBook}
        seedling={faSeedling}
        iconUser={faUser}
        iconCart={faCartShopping}
      />
      <div className="home__container-card">
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
        <CardMuda
          cultivar="Catuaí 62"
          embalagem="Saquinho"
          producao="100000"
          pedido="60000"
          estoque="40000"
        />
      </div>
    </>
  );
};

export default Home;
