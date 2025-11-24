// import React, { useState, useEffect, useMemo } from "react";
// import Header from "../../components/Header";
// import axios from "axios";
// import ModalMudas from "./ModalMudas";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlus,
//   faPen,
//   faTrash,
//   faFilter,
// } from "@fortawesome/free-solid-svg-icons";

// import {
//   SelectAno,
//   SelectCultivares,
//   SelectSementes,
//   SelectEmbalagens,
// } from "../../components/Select";

// const API = "http://localhost:3000/mudas";

// const Mudas = () => {
//   const [mudas, setMudas] = useState([]);
//   const [abrirModal, setAbrirModal] = useState(false);
//   const [carregando, setCarregando] = useState(true);

//   // controle de exibição
//   const [mostrarFiltros, setMostrarFiltros] = useState(false);

//   // filtros
//   const [fCultivar, setFCultivar] = useState("");
//   const [fAno, setFAno] = useState("");
//   const [fSemente, setFSemente] = useState("");
//   const [fEmbalagem, setFEmbalagem] = useState("");

//   // edição/criação
//   const [modalMode, setModalMode] = useState("create");
//   const [selectedMuda, setSelectedMuda] = useState(null);

//   // estado para UX do delete
//   const [deletandoId, setDeletandoId] = useState(null);

//   const limparFiltros = () => {
//     setFCultivar("");
//     setFAno("");
//     setFSemente("");
//     setFEmbalagem("");
//   };

//   useEffect(() => {
//     const carregar = async () => {
//       try {
//         const { data } = await axios.get(API);
//         setMudas(data);
//       } finally {
//         setCarregando(false);
//       }
//     };
//     carregar();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = abrirModal ? "hidden" : "";
//   }, [abrirModal]);

//   const handleNovo = () => {
//     setSelectedMuda(null);
//     setModalMode("create");
//     setAbrirModal(true);
//   };

//   const handleEditar = (muda) => {
//     setSelectedMuda(muda);
//     setModalMode("edit");
//     setAbrirModal(true);
//   };

//   /**
//    * Recebe do Modal o registro que acabou de ser salvo (POST ou PUT feito no Modal).
//    * Atualiza a lista local de forma otimista.
//    */
//   const handleSalvar = (mudaSalva) => {
//     if (!mudaSalva) return;

//     setMudas((prev) => {
//       const existe = prev.some((m) => m.id === mudaSalva.id);
//       return existe
//         ? prev.map((m) => (m.id === mudaSalva.id ? mudaSalva : m)) // PUT
//         : [mudaSalva, ...prev]; // POST (insere no topo; mude se preferir)
//     });

//     setAbrirModal(false);
//     setSelectedMuda(null);
//   };

//   /**
//    * DELETE /mudas/:id
//    */
//   const handleExcluir = async (id) => {
//     if (!id) return;

//     const ok = window.confirm("Tem certeza que deseja excluir este registro?");
//     if (!ok) return;

//     try {
//       setDeletandoId(id);

//       // opcional: otimismo – remove da UI antes de confirmar no servidor
//       setMudas((prev) => prev.filter((m) => m.id !== id));

//       await axios.delete(`${API}/${id}`);
//       // se quiser garantir sincronismo total, você poderia refazer o GET aqui.
//       // mas como já removemos otimisticamente, não é necessário.
//     } catch (err) {
//       console.error("Erro ao excluir:", err);
//       alert("Não foi possível excluir. Tente novamente.");
//       // rollback simples: recarrega a lista (caso tenha dado erro)
//       try {
//         const { data } = await axios.get(API);
//         setMudas(data);
//       } catch {}
//     } finally {
//       setDeletandoId(null);
//     }
//   };

//   // opções únicas dinamicamente
//   const optCultivares = useMemo(
//     () =>
//       Array.from(new Set((mudas ?? []).map((m) => m.cultivar).filter(Boolean))),
//     [mudas]
//   );
//   const optAnos = useMemo(
//     () =>
//       Array.from(
//         new Set((mudas ?? []).map((m) => String(m.ano ?? "")).filter(Boolean))
//       ).sort(),
//     [mudas]
//   );
//   const optSementes = useMemo(
//     () =>
//       Array.from(new Set((mudas ?? []).map((m) => m.semente).filter(Boolean))),
//     [mudas]
//   );
//   const optEmbalagens = useMemo(
//     () =>
//       Array.from(
//         new Set((mudas ?? []).map((m) => m.embalagem).filter(Boolean))
//       ),
//     [mudas]
//   );

//   // filtragem
//   const mudasFiltradas = useMemo(() => {
//     return (mudas ?? []).filter((m) => {
//       const okCultivar = !fCultivar || m.cultivar === fCultivar;
//       const okAno = !fAno || String(m.ano) === String(fAno);
//       const okSemente = !fSemente || m.semente === fSemente;
//       const okEmbalagem = !fEmbalagem || m.embalagem === fEmbalagem;
//       return okCultivar && okAno && okSemente && okEmbalagem;
//     });
//   }, [mudas, fCultivar, fAno, fSemente, fEmbalagem]);

//   const manyRows = mudasFiltradas.length > 10;

//   // ordenação: ano → cultivar → semente → embalagem
//   const coll = new Intl.Collator("pt-BR", {
//     sensitivity: "base",
//     numeric: true,
//   });

//   const mudasOrdenadas = useMemo(() => {
//     const arr = [...mudasFiltradas];
//     arr.sort((a, b) => {
//       // 1️⃣ ordena pelo ano (numérico)
//       const byAno = (a.ano ?? 0) - (b.ano ?? 0);
//       if (byAno !== 0) return byAno;

//       // 2️⃣ depois por cultivar (alfabético)
//       const byCultivar = coll.compare(a.cultivar || "", b.cultivar || "");
//       if (byCultivar !== 0) return byCultivar;

//       // 3️⃣ depois por semente
//       const bySemente = coll.compare(a.semente || "", b.semente || "");
//       if (bySemente !== 0) return bySemente;

//       // 4️⃣ por fim, por embalagem
//       return coll.compare(a.embalagem || "", b.embalagem || "");
//     });
//     return arr;
//   }, [mudasFiltradas]);

//   return (
//     <>
//       {/* FILTROS toggle no lugar do header quando abridos */}
//       {mostrarFiltros ? (
//         <section className="filtros__mudas-top">
//           <SelectCultivares
//             options={optCultivares}
//             value={fCultivar}
//             onChange={setFCultivar}
//           />
//           <SelectAno options={optAnos} value={fAno} onChange={setFAno} />
//           <SelectSementes
//             options={optSementes}
//             value={fSemente}
//             onChange={setFSemente}
//           />
//           <SelectEmbalagens
//             options={optEmbalagens}
//             value={fEmbalagem}
//             onChange={setFEmbalagem}
//           />
//           <button
//             type="button"
//             className="btn__limpar-filtros"
//             onClick={limparFiltros}
//           >
//             Limpar
//           </button>
//           <button
//             type="button"
//             className="btn__fechar-filtros"
//             onClick={() => setMostrarFiltros(false)}
//           >
//             Fechar
//           </button>
//         </section>
//       ) : (
//         <Header
//           titulo="Produção de Mudas"
//           faFilter={faFilter}
//           onFilterClick={() => setMostrarFiltros(true)}
//         />
//       )}

//       <main className="main__mudas">
//         {!abrirModal && (
//           <button
//             type="button"
//             className="botao__abrir-modal"
//             onClick={handleNovo}
//             title="Cadastrar produção"
//           >
//             <FontAwesomeIcon className="icon__add" icon={faPlus} />
//           </button>
//         )}

//         {!abrirModal && (
//           <section
//             className={`tabela__mudas ${
//               manyRows ? "tabela__mudas--scroll" : "tabela__mudas--auto"
//             }`}
//           >
//             {carregando ? (
//               <p>Carregando dados...</p>
//             ) : mudasFiltradas.length === 0 ? (
//               <p>Nenhum registro encontrado.</p>
//             ) : (
//               <table>
//                 <thead>
//                   <tr>
//                     {[
//                       { label: "Cultivar" },
//                       { label: "Ano" },
//                       { label: "Semente" },
//                       { label: "Embalagem" },
//                       { label: "Produção" },
//                       { label: "Ações", className: "acao" },
//                     ].map((col) => (
//                       <th
//                         key={col.label}
//                         className={col.className || undefined}
//                       >
//                         {col.label}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {mudasOrdenadas.map((m, idx) => (
//                     <tr key={m.id ?? `${m.cultivar}-${m.ano}-${idx}`}>
//                       <td>{m.cultivar ?? "-"}</td>
//                       <td>{m.ano ?? "-"}</td>
//                       <td>{m.semente ?? "-"}</td>
//                       <td>{m.embalagem ?? "-"}</td>
//                       <td>{Number(m.producao ?? 0).toLocaleString("pt-BR")}</td>
//                       <td className="acao">
//                         <div className="acoes">
//                           <button
//                             className="btn-edit"
//                             onClick={() => handleEditar(m)}
//                             title="Editar"
//                           >
//                             <FontAwesomeIcon icon={faPen} />
//                           </button>

//                           <button
//                             className="btn-delete"
//                             onClick={() => handleExcluir(m.id)}
//                             title={
//                               deletandoId === m.id ? "Excluindo..." : "Excluir"
//                             }
//                             disabled={deletandoId === m.id}
//                             style={{ opacity: deletandoId === m.id ? 0.5 : 1 }}
//                           >
//                             <FontAwesomeIcon icon={faTrash} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </section>
//         )}

//         {abrirModal && (
//           <ModalMudas
//             mode={modalMode}
//             initialData={selectedMuda}
//             onClose={() => {
//               setAbrirModal(false);
//               setSelectedMuda(null);
//             }}
//             onSave={handleSalvar}
//           />
//         )}
//       </main>
//     </>
//   );
// };

// export default Mudas;
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import axios from "axios";
import ModalMudas from "./ModalMudas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import {
  SelectAno,
  SelectCultivares,
  SelectSementes,
  SelectEmbalagens,
} from "../../components/Select";

import { notificar } from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

const API = "http://localhost:3000/mudas";

const Mudas = () => {
  const [mudas, setMudas] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // controle de exibição
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // filtros
  const [fCultivar, setFCultivar] = useState("");
  const [fAno, setFAno] = useState("");
  const [fSemente, setFSemente] = useState("");
  const [fEmbalagem, setFEmbalagem] = useState("");

  // edição/criação
  const [modalMode, setModalMode] = useState("create");
  const [selectedMuda, setSelectedMuda] = useState(null);

  // estado para UX do delete
  const [deletandoId, setDeletandoId] = useState(null);

  // estado do ConfirmDialog de exclusão
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    muda: null,
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
        notificar("erro", "Não foi possível carregar as mudas.");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
  }, []);

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

  /**
   * Recebe do Modal o registro que acabou de ser salvo (POST ou PUT feito no Modal).
   * Atualiza a lista local de forma otimista.
   */
  const handleSalvar = (mudaSalva) => {
    if (!mudaSalva) return;

    setMudas((prev) => {
      const existe = prev.some((m) => m.id === mudaSalva.id);
      return existe
        ? prev.map((m) => (m.id === mudaSalva.id ? mudaSalva : m)) // PUT
        : [mudaSalva, ...prev]; // POST
    });

    notificar(
      "sucesso",
      modalMode === "edit"
        ? "Produção de mudas atualizada com sucesso."
        : "Produção de mudas cadastrada com sucesso."
    );

    setAbrirModal(false);
    setSelectedMuda(null);
  };

  /**
   * Abre o ConfirmDialog para exclusão
   */
  const handleExcluirClick = (muda) => {
    if (!muda) return;
    setConfirmDelete({
      open: true,
      muda,
    });
  };

  /**
   * Confirma a exclusão (chamado pelo ConfirmDialog)
   */
  const handleConfirmDelete = async () => {
    const muda = confirmDelete.muda;
    if (!muda || !muda.id) return;

    const id = muda.id;

    try {
      setDeletandoId(id);
      await axios.delete(`${API}/${id}`);
      setMudas((prev) => prev.filter((m) => m.id !== id));
      notificar("sucesso", "Registro excluído com sucesso.");
    } catch (err) {
      console.error("Erro ao excluir:", err);
      notificar("erro", "Não foi possível excluir. Tente novamente.");
    } finally {
      setDeletandoId(null);
      setConfirmDelete({ open: false, muda: null });
    }
  };

  const handleCancelDelete = () => {
    setConfirmDelete({ open: false, muda: null });
  };

  // opções únicas dinamicamente
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

  const manyRows = mudasFiltradas.length > 10;

  // ordenação: ano → cultivar → semente → embalagem
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

  return (
    <>
      {/* FILTROS toggle no lugar do header quando abridos */}
      {mostrarFiltros ? (
        <section className="filtros__mudas-top">
          <SelectCultivares
            options={optCultivares}
            value={fCultivar}
            onChange={setFCultivar}
          />
          <SelectAno options={optAnos} value={fAno} onChange={setFAno} />
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
          titulo="Produção de Mudas"
          faFilter={faFilter}
          onFilterClick={() => setMostrarFiltros(true)}
        />
      )}

      <main className="main__mudas">
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

        {!abrirModal && (
          <section
            className={`tabela__mudas ${
              manyRows ? "tabela__mudas--scroll" : "tabela__mudas--auto"
            }`}
          >
            {carregando ? (
              <p>Carregando dados...</p>
            ) : mudasFiltradas.length === 0 ? (
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
                  {mudasOrdenadas.map((m, idx) => (
                    <tr key={m.id ?? `${m.cultivar}-${m.ano}-${idx}`}>
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
                            onClick={() => handleExcluirClick(m)}
                            title={
                              deletandoId === m.id ? "Excluindo..." : "Excluir"
                            }
                            disabled={deletandoId === m.id}
                            style={{ opacity: deletandoId === m.id ? 0.5 : 1 }}
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

      {/* Modal de confirmação para exclusão */}
      <ConfirmDialog
        open={confirmDelete.open}
        title="Excluir produção de mudas?"
        description={
          confirmDelete.muda ? (
            <div className="confirm-modal__item-info">
              {/* 1️⃣ Cultivar + ano */}
              <div className="confirm-modal__item-cultivar">
                {confirmDelete.muda.cultivar}{" "}
                {confirmDelete.muda.ano && `(${confirmDelete.muda.ano})`}
              </div>

              {/* 2️⃣ Semente + embalagem */}
              <div className="confirm-modal__item-line">
                {confirmDelete.muda.semente} • {confirmDelete.muda.embalagem}
              </div>

              {/* 3️⃣ Produção no final */}
              <div className="confirm-modal__item-line">
                Produção:{" "}
                <strong>
                  {Number(confirmDelete.muda.producao ?? 0).toLocaleString(
                    "pt-BR"
                  )}
                </strong>
              </div>
            </div>
          ) : (
            "Tem certeza que deseja excluir este registro?"
          )
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Mudas;
