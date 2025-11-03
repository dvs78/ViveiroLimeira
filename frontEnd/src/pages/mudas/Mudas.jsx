import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import CardMuda from "../../components/CardMuda";
import ModalMudas from "./ModalMudas";
import "./mudas.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Mudas = () => {
  const [mudas, setMudas] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/mudas");
        setMudas(data);
      } catch (err) {
        console.error("Erro ao buscar mudas:", err);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  // Ex.: adicionar ao carrinho (ajuste para sua lógica)
  const handleAdd = (item) => {
    console.log("Adicionar:", item);
    // ex.: setCarrinho(prev => [...prev, item])
  };

  return (
    <>
      <Header titulo="Produção de Mudas" />

      <main className="main__mudas">
        <section className="cadastro__mudas">
          {!abrirModal && (
            <button
              type="button"
              className="botao__abrir-modal"
              onClick={() => setAbrirModal(true)}
              title="Cadastrar produção"
            >
              <FontAwesomeIcon className="icon__add" icon={faPlus} />
            </button>
          )}
          {abrirModal && <ModalMudas onClose={() => setAbrirModal(false)} />}
        </section>
        <h3>fazer uma tabela</h3>
      </main>
    </>
  );
};

export default Mudas;
