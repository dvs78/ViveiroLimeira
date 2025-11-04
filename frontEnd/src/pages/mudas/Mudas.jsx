import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import ModalMudas from "./ModalMudas";
import "./mudas.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

// ...imports iguais
const Mudas = () => {
  const [mudas, setMudas] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [carregando, setCarregando] = useState(true);

  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [selectedMuda, setSelectedMuda] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/mudas");
        setMudas(data);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  // trava o scroll de fundo quando o modal está aberto (fica elegante)
  useEffect(() => {
    document.body.style.overflow = abrirModal ? "hidden" : "";
  }, [abrirModal]);

  const handleNovo = () => {
    setSelectedMuda(null);
    setModalMode("create");
    setAbrirModal(true);
  };

  const handleEditar = (muda) => {
    setSelectedMuda(muda);
    setModalMode("edit");
    setAbrirModal(true);
  };

  const handleSalvar = async (values) => {
    // ... POST/PUT como você já fez
    setAbrirModal(false);
    setSelectedMuda(null);
  };

  const handleExcluir = async (id) => {
    // ... sua lógica de DELETE
  };

  return (
    <>
      <Header titulo="Produção de Mudas" />

      <main className="main__mudas">
        {/* FAB só aparece quando o modal NÃO está aberto */}
        {!abrirModal && (
          <button
            type="button"
            className="botao__abrir-modal"
            onClick={handleNovo}
            title="Cadastrar produção"
          >
            <FontAwesomeIcon className="icon__add" icon={faPlus} />
          </button>
        )}

        {/* TABELA só aparece quando o modal NÃO está aberto */}
        {!abrirModal && (
          <section className="tabela__mudas">
            {carregando ? (
              <p>Carregando dados...</p>
            ) : mudas.length === 0 ? (
              <p>Nenhum registro encontrado.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    {[
                      { label: "Cultivar" },
                      { label: "Ano" },
                      { label: "Semente" },
                      { label: "Embalagem" },
                      { label: "Produção" },
                      { label: "Ações", className: "acao" },
                    ].map((col) => (
                      <th
                        key={col.label}
                        className={col.className || undefined}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {mudas.map((m, idx) => (
                    <tr
                      key={
                        m.id ??
                        `${m.cultivar ?? "sem-cultivar"}-${
                          m.ano ?? "sem-ano"
                        }-${idx}`
                      }
                    >
                      <td>{m.cultivar ?? "-"}</td>
                      <td>{m.ano ?? "-"}</td>
                      <td>{m.semente ?? "-"}</td>
                      <td>{m.embalagem ?? "-"}</td>
                      <td>{Number(m.producao ?? 0).toLocaleString("pt-BR")}</td>
                      <td className="acao">
                        <div className="acoes">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditar(m)}
                            title="Editar"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleExcluir(m.id)}
                            title="Excluir"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {/* MODAL centralizado com dados preenchidos */}
        {abrirModal && (
          <ModalMudas
            mode={modalMode}
            initialData={selectedMuda}
            onClose={() => {
              setAbrirModal(false);
              setSelectedMuda(null);
            }}
            onSave={handleSalvar}
          />
        )}
      </main>
    </>
  );
};

export default Mudas;
