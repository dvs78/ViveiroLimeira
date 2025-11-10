import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [producao, setProducao] = useState("");
  const [salvando, setSalvando] = useState(false);

  // popula quando abrir em modo edição
  useEffect(() => {
    if (initialData) {
      setAno(String(initialData.ano ?? ""));
      setCultivar(initialData.cultivar ?? "");
      setSemente(initialData.semente ?? "");
      setEmbalagem(initialData.embalagem ?? "");
      setProducao(
        initialData.producao !== undefined && initialData.producao !== null
          ? String(initialData.producao)
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

  const producaoFmt = producao ? Number(producao).toLocaleString("pt-BR") : "";

  const handleProducaoChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setProducao(raw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSalvando(true);

    try {
      const payload = {
        ano: ano ? Number(ano) : null,
        cultivar,
        semente,
        embalagem,
        producao: producao ? Number(producao) : 0,
      };

      let response;
      if (mode === "edit" && initialData?.id) {
        // PUT para atualizar
        response = await axios.put(
          `http://localhost:3000/mudas/${initialData.id}`,
          payload
        );
      } else {
        // POST para criar
        response = await axios.post("http://localhost:3000/mudas", payload);
      }

      // sucesso → retorna o registro salvo ao pai (para atualizar tabela)
      onSave?.(response.data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar muda:", error);
      alert("Erro ao salvar. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
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
              <button
                className="btn__salvar-modal"
                type="submit"
                disabled={salvando}
              >
                {salvando
                  ? "Salvando..."
                  : mode === "edit"
                  ? "Salvar alterações"
                  : "Salvar"}
              </button>
              <button
                className="btn__cancelar-modal"
                type="button"
                onClick={onClose}
                disabled={salvando}
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
