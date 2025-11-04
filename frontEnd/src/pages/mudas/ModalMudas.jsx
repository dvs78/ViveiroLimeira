import React, { useEffect, useState } from "react";
import FecharModal from "../../components/FecharModal";
import {
  SelectAno,
  SelectCultivares,
  SelectSementes,
  SelectEmbalagens,
} from "../../components/Select";

const ModalMudas = ({
  mode = "create",
  initialData = null,
  onSave,
  onClose,
}) => {
  FecharModal(onClose);

  const [ano, setAno] = useState("");
  const [cultivar, setCultivar] = useState("");
  const [semente, setSemente] = useState("");
  const [embalagem, setEmbalagem] = useState("");

  // guardamos o valor da produção em "string de dígitos" (ex.: "18000")
  const [producao, setProducao] = useState("");

  // popula quando abrir em modo edição
  useEffect(() => {
    if (initialData) {
      setAno(String(initialData.ano ?? ""));
      setCultivar(initialData.cultivar ?? "");
      setSemente(initialData.semente ?? "");
      setEmbalagem(initialData.embalagem ?? "");
      setProducao(
        initialData.producao !== undefined && initialData.producao !== null
          ? String(initialData.producao) // vira "18000"
          : ""
      );
    } else {
      setAno("");
      setCultivar("");
      setSemente("");
      setEmbalagem("");
      setProducao("");
    }
  }, [initialData]);

  // formata para exibir no input (ex.: "18.000")
  const producaoFmt = producao ? Number(producao).toLocaleString("pt-BR") : "";

  // onChange simples: só números
  const handleProducaoChange = (e) => {
    const raw = e.target.value.replace(/\D/g, ""); // mantém apenas dígitos
    setProducao(raw);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...(initialData?.id ? { id: initialData.id } : {}),
      ano,
      cultivar,
      semente,
      embalagem,
      producao: producao ? Number(producao) : 0, // número limpo
    });
  };

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div id="modal-mudas" onClick={(e) => e.stopPropagation()}>
        <div className="form__modal">
          <h2>{mode === "edit" ? "Editar Produção" : "Cadastrar Produção"}</h2>

          <form className="form__modal-form" onSubmit={handleSubmit}>
            <SelectAno value={ano} defaultValue={ano} onChange={setAno} />

            <SelectCultivares
              value={cultivar}
              defaultValue={cultivar}
              onChange={setCultivar}
            />

            <SelectSementes
              value={semente}
              defaultValue={semente}
              onChange={setSemente}
            />

            <SelectEmbalagens
              value={embalagem}
              defaultValue={embalagem}
              onChange={setEmbalagem}
            />

            {/* PRODUÇÃO com mesmo estilo dos selects */}
            <label className="input__linha-unica">
              <span>Produção</span>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Quantidade (unid.)"
                value={producaoFmt}
                onChange={handleProducaoChange}
              />
            </label>

            <div className="btns__modal">
              <button className="btn__salvar-modal" type="submit">
                {mode === "edit" ? "Salvar alterações" : "Salvar"}
              </button>
              <button
                className="btn__cancelar-modal"
                type="button"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalMudas;
