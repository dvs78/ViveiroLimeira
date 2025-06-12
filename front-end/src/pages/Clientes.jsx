import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
import { capitalizePalavras } from "../utilitarios/funcoesDiversas.js";
import {
  getAllClients,
  insertOneClient,
  updateByIdClient,
  deleteByIdClient,
} from "../../apiFront/reqClientes.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Clientes = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [clientesArray, setClientesArray] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [erros, setErros] = useState({ nome: false, sobrenome: false });
  const [loading, setLoading] = useState(false);

  // Toasts personalizados
  const mostrarToast = (mensagem, cor = "#2ecc71") => {
    Toastify({
      text: mensagem,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: cor,
        borderRadius: "8px",
        fontSize: "0.95rem",
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: "bold",
      },
    }).showToast();
  };

  // Capitaliza no onBlur
  const handleBlurNome = () => setNome(capitalizePalavras(nome));
  const handleBlurSobrenome = () => setSobrenome(capitalizePalavras(sobrenome));

  // Carrega clientes do backend
  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      const clientes = await getAllClients();
      setClientesArray(clientes);
      setLoading(false);
    };
    carregar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposInvalidos = {
      nome: nome.trim() === "",
      sobrenome: sobrenome.trim() === "",
    };
    setErros(camposInvalidos);
    if (Object.values(camposInvalidos).some(Boolean)) return;

    const cliente = {
      nome: capitalizePalavras(nome.trim()),
      sobrenome: capitalizePalavras(sobrenome.trim()),
      nomecompleto: capitalizePalavras(`${nome.trim()} ${sobrenome.trim()}`),
    };

    if (modoEdicao && indiceEditando !== null) {
      // Atualização
      const clienteAntigo = clientesArray[indiceEditando];
      const id = clienteAntigo.id;

      const sucesso = await updateByIdClient(id, cliente);

      if (sucesso) {
        const atualizados = [...clientesArray];
        atualizados[indiceEditando] = { ...cliente, id };
        setClientesArray(atualizados);
        setModoEdicao(false);
        setIndiceEditando(null);
        mostrarToast("Cliente editado com sucesso!", "#2ecc71");
      }
    } else {
      // Cadastro
      const novo = await insertOneClient(cliente);
      console.log("Cliente retornado do insertOneClient:", novo);
      if (novo?.id) {
        setClientesArray((prev) => [...prev, novo]);
        mostrarToast("Cliente salvo com sucesso!", "#2ecc71");
      }
      // const novo = await insertOneClient(cliente);
      // console.log("🚀 Cliente retornado do insertOneClient:", novo);
      // if (novo) {
      //   const atualizados = await getAllClients();
      //   setClientesArray(atualizados);
      //   mostrarToast("Cliente salvo com sucesso!", "#2ecc71");
      // }
    }

    // Resetar o formulário
    setNome("");
    setSobrenome("");
    setErros({ nome: false, sobrenome: false });
  };

  const handleEditar = (index) => {
    const cliente = clientesArray[index];
    setNome(cliente.nome);
    setSobrenome(cliente.sobrenome);
    setIndiceEditando(index);
    setModoEdicao(true);
  };

  const cancelarEdicao = () => {
    setNome("");
    setSobrenome("");
    setModoEdicao(false);
    setIndiceEditando(null);
    setErros({ nome: false, sobrenome: false });
  };

  const handleExcluir = async (index) => {
    const cliente = clientesArray[index];
    const confirmacao = confirm(`Deseja excluir ${cliente.nomecompleto}?`);
    if (!confirmacao) return;

    const sucesso = await deleteByIdClient(cliente);

    if (sucesso) {
      const novaLista = clientesArray.filter((_, i) => i !== index);
      setClientesArray(novaLista);
      mostrarToast("Cliente excluído com sucesso!", "#e74c3c");
    }
  };

  return (
    <div
      className="main__pages-child"
      style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
    >
      <div className="secao__blocos">
        <h1 className="header__title">
          {modoEdicao ? "Editar Cliente" : "Cadastrar Clientes"}
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Nome */}
          <div className="div_input">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              onBlur={handleBlurNome}
              className={erros.nome ? "erro" : ""}
              placeholder="Digite o nome"
            />
          </div>

          {/* Sobrenome */}
          <div className="div_input">
            <label htmlFor="sobrenome">Sobrenome:</label>
            <input
              type="text"
              id="sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              onBlur={handleBlurSobrenome}
              className={erros.sobrenome ? "erro" : ""}
              placeholder="Digite o sobrenome"
            />
          </div>

          {/* Botões do form */}
          <div className="form__div-button">
            <button
              className="form__button--enviar"
              type="submit"
              disabled={loading}
            >
              {modoEdicao ? "Editar" : "Salvar"}
            </button>
            {modoEdicao && (
              <button
                type="button"
                className="form__button--cancelar"
                onClick={cancelarEdicao}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="secao__blocos">
        <h1 className="header__title">Clientes Cadastrados</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : clientesArray.length > 0 ? (
          <table className="tabela-clientes">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Nome Completo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesArray.map((cliente, index) => (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.sobrenome}</td>
                  <td>{cliente.nomecompleto}</td>
                  <td>
                    <div className="tabela__div--button">
                      <button
                        className="tabela__button--editar"
                        onClick={() => handleEditar(index)}
                      >
                        <FontAwesomeIcon
                          className="tabela__icon--editar"
                          icon={faPencil}
                        />
                      </button>
                      <button
                        className="tabela__button--excluir"
                        onClick={() => handleExcluir(index)}
                      >
                        <FontAwesomeIcon
                          className="tabela__icon--excluir"
                          icon={faTrash}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum cliente cadastrado.</p>
        )}
      </div>
    </div>
  );
};

export default Clientes;
