import { useState, useEffect } from "react";
import CardMuda from "../../components/CardMuda";
import Header from "../../components/Header";
import axios from "axios";

import {
  faTruck,
  faBook,
  faSeedling,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const API = "http://localhost:3000/mudas"; // define o endpoint

const Home = () => {
  const [mudas, setMudas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(API);
        // Ordena igual ao padrão da tabela
        const coll = new Intl.Collator("pt-BR", {
          sensitivity: "base",
          numeric: true,
        });
        const ordenadas = [...data].sort((a, b) => {
          const byAno = (a.ano ?? 0) - (b.ano ?? 0);
          if (byAno !== 0) return byAno;
          const byCultivar = coll.compare(a.cultivar || "", b.cultivar || "");
          if (byCultivar !== 0) return byCultivar;
          const bySemente = coll.compare(a.semente || "", b.semente || "");
          if (bySemente !== 0) return bySemente;
          return coll.compare(a.embalagem || "", b.embalagem || "");
        });
        setMudas(ordenadas);
      } catch (err) {
        console.error("Erro ao carregar mudas:", err);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

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
        {carregando ? (
          <p>Carregando dados...</p>
        ) : mudas.length === 0 ? (
          <p>Nenhuma muda cadastrada.</p>
        ) : (
          mudas.map((m) => (
            <CardMuda
              key={m.id}
              cultivar={m.cultivar}
              ano={m.ano}
              semente={m.semente}
              embalagem={m.embalagem}
              producao={m.producao}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Home;
