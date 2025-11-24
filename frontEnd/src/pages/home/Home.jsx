import { notificar } from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useState, useEffect, useMemo } from "react";
import CardMuda from "../../components/CardMuda";
import Header from "../../components/Header";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import {
  faTruck,
  faBook,
  faSeedling,
  faUser,
  faCartShopping,
  faFilter,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import {
  SelectAno,
  SelectCultivares,
  SelectSementes,
  SelectEmbalagens,
} from "../../components/Select";

const API = "http://localhost:3000/mudas";

const Home = () => {
  const [mudas, setMudas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // filtros
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [fCultivar, setFCultivar] = useState("");
  const [fAno, setFAno] = useState("");
  const [fSemente, setFSemente] = useState("");
  const [fEmbalagem, setFEmbalagem] = useState("");

  // carrinho lateral
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [mudaSelecionada, setMudaSelecionada] = useState(null);
  const [qtdeRaw, setQtdeRaw] = useState("");
  const [valorUnit, setValorUnit] = useState("");

  // lista de itens já adicionados
  const [itensCarrinho, setItensCarrinho] = useState([]);

  // confirmação de ações perigosas (remover item / limpar carrinho)
  const [confirmConfig, setConfirmConfig] = useState({
    open: false,
    tipo: null,
    index: null,
    item: null,
  });

  const limparFiltros = () => {
    setFCultivar("");
    setFAno("");
    setFSemente("");
    setFEmbalagem("");
  };

  useEffect(() => {
    const carregar = async () => {
      try {
        const { data } = await axios.get(API);
        setMudas(data);
      } catch (err) {
        console.error("Erro ao carregar mudas:", err);
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

  // opções únicas
  const optCultivares = useMemo(
    () =>
      Array.from(new Set((mudas ?? []).map((m) => m.cultivar).filter(Boolean))),
    [mudas]
  );

  const optAnos = useMemo(
    () =>
      Array.from(
        new Set((mudas ?? []).map((m) => String(m.ano ?? "")).filter(Boolean))
      ).sort(),
    [mudas]
  );

  const optSementes = useMemo(
    () =>
      Array.from(new Set((mudas ?? []).map((m) => m.semente).filter(Boolean))),
    [mudas]
  );

  const optEmbalagens = useMemo(
    () =>
      Array.from(
        new Set((mudas ?? []).map((m) => m.embalagem).filter(Boolean))
      ),
    [mudas]
  );

  // filtragem
  const mudasFiltradas = useMemo(() => {
    return (mudas ?? []).filter((m) => {
      const okCultivar = !fCultivar || m.cultivar === fCultivar;
      const okAno = !fAno || String(m.ano) === String(fAno);
      const okSemente = !fSemente || m.semente === fSemente;
      const okEmbalagem = !fEmbalagem || m.embalagem === fEmbalagem;
      return okCultivar && okAno && okSemente && okEmbalagem;
    });
  }, [mudas, fCultivar, fAno, fSemente, fEmbalagem]);

  // ordenação
  const coll = new Intl.Collator("pt-BR", {
    sensitivity: "base",
    numeric: true,
  });

  const mudasOrdenadas = useMemo(() => {
    const arr = [...mudasFiltradas];
    arr.sort((a, b) => {
      const byAno = (a.ano ?? 0) - (b.ano ?? 0);
      if (byAno !== 0) return byAno;

      const byCultivar = coll.compare(a.cultivar || "", b.cultivar || "");
      if (byCultivar !== 0) return byCultivar;

      const bySemente = coll.compare(a.semente || "", b.semente || "");
      if (bySemente !== 0) return bySemente;

      return coll.compare(a.embalagem || "", b.embalagem || "");
    });
    return arr;
  }, [mudasFiltradas]);

  // totais gerais (usando as mudas filtradas)
  const totaisMudas = useMemo(() => {
    return (mudasFiltradas ?? []).reduce(
      (acc, m) => {
        const prod = Number(m.producao) || 0;
        const ped = Number(m.pedido) || 0;

        // mesmo critério do CardMuda: estoque = produção - pedido
        const est = prod - ped;

        acc.producao += prod;
        acc.pedido += ped;
        acc.estoque += est;
        return acc;
      },
      { producao: 0, pedido: 0, estoque: 0 }
    );
  }, [mudasFiltradas]);

  // total calculado do item atual
  const total = useMemo(() => {
    const q = qtdeRaw ? Number(qtdeRaw) : 0;
    const v = parseFloat(String(valorUnit).replace(",", "."));
    if (!Number.isFinite(q) || isNaN(v)) return 0;
    return q * v;
  }, [qtdeRaw, valorUnit]);

  // totais do carrinho
  const totalMudasCarrinho = useMemo(
    () => itensCarrinho.reduce((acc, item) => acc + (item.quantidade || 0), 0),
    [itensCarrinho]
  );

  const totalValorCarrinho = useMemo(
    () => itensCarrinho.reduce((acc, item) => acc + (item.total || 0), 0),
    [itensCarrinho]
  );

  // abrir carrinho com muda selecionada
  const handleAddToCart = (muda) => {
    setMudaSelecionada(muda);
    setQtdeRaw("");
    setValorUnit("");
    setCarrinhoAberto(true);
  };

  // Abrir carrinho pelo ícone do header
  const abrirCarrinhoPeloHeader = () => {
    setCarrinhoAberto(true);
    setMudaSelecionada(null); // não mostra formulário, só itens/resumo
    setQtdeRaw("");
    setValorUnit("");
  };

  const fecharCarrinho = () => {
    setCarrinhoAberto(false);
    setMudaSelecionada(null);
    setQtdeRaw("");
    setValorUnit("");
  };

  // remover item do carrinho pelo índice
  // remover item do carrinho pelo índice
  // const removerItemCarrinho = (index) => {
  //   setItensCarrinho((prev) => prev.filter((_, i) => i !== index));
  //   notificar("erro", "Item removido do carrinho.");
  // };
  const pedirConfirmacaoRemoverItem = (index) => {
    setConfirmConfig({
      open: true,
      tipo: "remover-item",
      index,
      item: itensCarrinho[index], // <<-- aqui está a mágica
    });
  };

  // limpar carrinho inteiro
  // const limparCarrinho = () => {
  //   if (itensCarrinho.length === 0) {
  //     notificar("info", "O carrinho já está vazio.");
  //     return;
  //   }

  //   const ok = window.confirm("Deseja remover todos os itens do carrinho?");
  //   if (!ok) return;

  //   setItensCarrinho([]);
  //   notificar("sucesso", "Carrinho limpo com sucesso.");
  // };
  const limparCarrinho = () => {
    if (itensCarrinho.length === 0) {
      notificar("info", "O carrinho já está vazio.");
      return;
    }

    setConfirmConfig({
      open: true,
      tipo: "limpar-carrinho",
      index: null,
    });
  };

  const fecharDialogoConfirmacao = () => {
    setConfirmConfig((prev) => ({ ...prev, open: false }));
  };

  const confirmarAcaoPerigosa = () => {
    if (confirmConfig.tipo === "remover-item" && confirmConfig.index !== null) {
      setItensCarrinho((prev) =>
        prev.filter((_, i) => i !== confirmConfig.index)
      );
      notificar("erro", "Item removido do carrinho.");
    }

    if (confirmConfig.tipo === "limpar-carrinho") {
      setItensCarrinho([]);
      notificar("sucesso", "Carrinho limpo com sucesso.");
    }

    setConfirmConfig({ open: false, tipo: null, index: null });
  };

  // confirmar item atual
  const confirmarItem = () => {
    const quantidade = qtdeRaw ? Number(qtdeRaw) : 0;
    const valor = parseFloat(String(valorUnit).replace(",", "."));

    if (!mudaSelecionada || !quantidade || !Number.isFinite(valor)) {
      notificar("erro", "Preencha quantidade e valor unitário corretamente.");
      return;
    }

    const novoItem = {
      idMuda: mudaSelecionada.id,
      cultivar: mudaSelecionada.cultivar,
      semente: mudaSelecionada.semente,
      embalagem: mudaSelecionada.embalagem,
      quantidade,
      valorUnit: valor,
      total,
    };

    setItensCarrinho((prev) => [...prev, novoItem]);
    notificar("sucesso", "Item adicionado ao carrinho.");

    // limpa campos mas mantém o carrinho aberto
    setQtdeRaw("");
    setValorUnit("");
    setMudaSelecionada(null);
  };

  return (
    <>
      {mostrarFiltros ? (
        <section className="filtros__mudas-top">
          <SelectAno options={optAnos} value={fAno} onChange={setFAno} />
          <SelectCultivares
            options={optCultivares}
            value={fCultivar}
            onChange={setFCultivar}
          />

          <SelectSementes
            options={optSementes}
            value={fSemente}
            onChange={setFSemente}
          />
          <SelectEmbalagens
            options={optEmbalagens}
            value={fEmbalagem}
            onChange={setFEmbalagem}
          />
          <button
            type="button"
            className="btn__limpar-filtros"
            onClick={limparFiltros}
          >
            Limpar
          </button>
          <button
            type="button"
            className="btn__fechar-filtros"
            onClick={() => setMostrarFiltros(false)}
          >
            Fechar
          </button>
        </section>
      ) : (
        <Header
          titulo="Viveiro de Café"
          truck={faTruck}
          book={faBook}
          seedling={faSeedling}
          iconUser={faUser}
          iconCart={faCartShopping}
          faFilter={faFilter}
          onFilterClick={() => setMostrarFiltros(true)}
          onCartClick={abrirCarrinhoPeloHeader}
        />
      )}

      {/* ===== Resumo geral de produção/pedido/estoque ===== */}
      <section className="resumo__mudas">
        <div className="resumo__mudas-card resumo__mudas-card--producao">
          <span className="resumo__mudas-label">Produção total</span>
          <strong className="resumo__mudas-value">
            {totaisMudas.producao.toLocaleString("pt-BR")}
          </strong>
        </div>

        <div className="resumo__mudas-card resumo__mudas-card--pedido">
          <span className="resumo__mudas-label">Pedido total</span>
          <strong className="resumo__mudas-value">
            {totaisMudas.pedido.toLocaleString("pt-BR")}
          </strong>
        </div>

        <div className="resumo__mudas-card resumo__mudas-card--estoque">
          <span className="resumo__mudas-label">Estoque total</span>
          <strong className="resumo__mudas-value">
            {totaisMudas.estoque.toLocaleString("pt-BR")}
          </strong>
        </div>
      </section>

      <div className="home__container-card">
        {carregando ? (
          <p>Carregando dados...</p>
        ) : mudasOrdenadas.length === 0 ? (
          <p>Nenhuma muda cadastrada.</p>
        ) : (
          mudasOrdenadas.map((m) => (
            <CardMuda
              key={m.id}
              cultivar={m.cultivar}
              ano={m.ano}
              semente={m.semente}
              embalagem={m.embalagem}
              producao={m.producao}
              pedido={m.pedido}
              estoque={m.estoque}
              onAdd={() => handleAddToCart(m)}
            />
          ))
        )}
      </div>

      {/* ===== Barra lateral do carrinho ===== */}
      {carrinhoAberto && (
        <>
          <div className="cart-sidebar__overlay" onClick={fecharCarrinho}></div>

          <aside className="cart-sidebar">
            <header className="cart-sidebar__header">
              <h2>Carrinho</h2>

              {itensCarrinho.length > 0 && (
                <button
                  type="button"
                  className="cart-sidebar__clear"
                  onClick={limparCarrinho}
                >
                  <span>Limpar carrinho</span>
                </button>
              )}

              <button
                type="button"
                className="cart-sidebar__close"
                onClick={fecharCarrinho}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </header>

            <div className="cart-sidebar__body">
              {/* 1) FORMULÁRIO */}
              {mudaSelecionada && (
                <section className="cart-panel">
                  <div className="cart-panel__info">
                    <p className="cart-panel__cultivar">
                      {mudaSelecionada.cultivar}
                    </p>
                    <p className="cart-panel__meta">
                      <span>{mudaSelecionada.semente}</span>
                      <span> • {mudaSelecionada.embalagem}</span>
                    </p>
                  </div>

                  <div className="cart-panel__row">
                    <label className="cart-field">
                      <span className="cart-field__label">
                        Quantidade de mudas
                      </span>
                      <input
                        className="cart-field__input"
                        type="text"
                        inputMode="numeric"
                        value={
                          qtdeRaw === ""
                            ? ""
                            : Number(qtdeRaw).toLocaleString("pt-BR")
                        }
                        onChange={(e) => {
                          const digitos = e.target.value.replace(/\D/g, "");
                          setQtdeRaw(digitos);
                        }}
                      />
                    </label>

                    <label className="cart-field">
                      <span className="cart-field__label">
                        Valor unitário (R$)
                      </span>
                      <input
                        className="cart-field__input"
                        type="number"
                        min="0"
                        step="0.01"
                        value={valorUnit}
                        onChange={(e) => setValorUnit(e.target.value)}
                      />
                    </label>
                  </div>

                  {/* total + botão lado a lado */}
                  <div className="cart-panel__actions">
                    <div className="cart-panel__total-row">
                      <strong>
                        R${" "}
                        {total.toLocaleString("pt-BR", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="cart-panel__confirm"
                      onClick={confirmarItem}
                    >
                      Confirmar
                    </button>
                  </div>
                </section>
              )}

              {/* 2) ITENS ADICIONADOS */}
              {itensCarrinho.length > 0 && (
                <section className="cart-items">
                  <h3 className="cart-items__title">Itens adicionados</h3>
                  <ul className="cart-items__list">
                    {itensCarrinho.map((item, index) => (
                      <li key={index} className="cart-items__item">
                        <div className="cart-items__top">
                          <div>
                            <span className="cart-items__cultivar">
                              {item.cultivar}
                            </span>
                            <span className="cart-items__meta">
                              {item.semente} • {item.embalagem}
                            </span>
                          </div>

                          <button
                            type="button"
                            className="cart-items__remove"
                            onClick={() => pedirConfirmacaoRemoverItem(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>

                        <div className="cart-items__bottom">
                          <span>
                            Qtde:{" "}
                            <strong>
                              {item.quantidade.toLocaleString("pt-BR")}
                            </strong>
                          </span>
                          <span>
                            Total:{" "}
                            <strong>
                              R${" "}
                              {item.total.toLocaleString("pt-BR", {
                                minimumFractionDigits: 0,
                              })}
                            </strong>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* 3) RESUMO DO CARRINHO */}
              <section className="cart-summary">
                <div className="cart-summary__row">
                  <span>Mudas no carrinho</span>
                  <strong>{totalMudasCarrinho.toLocaleString("pt-BR")}</strong>
                </div>
                <div className="cart-summary__row cart-summary__row--total">
                  <span>Total do carrinho</span>
                  <strong>
                    R${" "}
                    {totalValorCarrinho.toLocaleString("pt-BR", {
                      minimumFractionDigits: 0,
                    })}
                  </strong>
                </div>
              </section>
            </div>
          </aside>
        </>
      )}
      {/* Modal de confirmação reutilizável */}
      <ConfirmDialog
        open={confirmConfig.open}
        title={
          confirmConfig.tipo === "limpar-carrinho"
            ? "Limpar carrinho?"
            : "Remover item do carrinho?"
        }
        description={
          confirmConfig.tipo === "limpar-carrinho" ? (
            "Essa ação vai remover todos os itens adicionados. Deseja continuar?"
          ) : (
            <div className="confirm-modal__item-info">
              <div className="confirm-modal__item-cultivar">
                {confirmConfig.item?.cultivar}
              </div>

              <div className="confirm-modal__item-line">
                {confirmConfig.item?.semente} • {confirmConfig.item?.embalagem}
              </div>

              <div className="confirm-modal__item-line">
                Qtde:{" "}
                <strong>
                  {confirmConfig.item?.quantidade.toLocaleString("pt-BR")}
                </strong>
              </div>

              <div className="confirm-modal__item-line">
                Total:{" "}
                <strong>
                  R$ {confirmConfig.item?.total.toLocaleString("pt-BR")}
                </strong>
              </div>
            </div>
          )
        }
        confirmLabel={
          confirmConfig.tipo === "limpar-carrinho"
            ? "Sim, limpar tudo"
            : "Sim, remover"
        }
        cancelLabel="Cancelar"
        onConfirm={confirmarAcaoPerigosa}
        onCancel={fecharDialogoConfirmacao}
      />
    </>
  );
};

export default Home;
