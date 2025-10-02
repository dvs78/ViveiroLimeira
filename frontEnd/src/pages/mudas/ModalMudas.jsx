import React, { useEffect } from "react";
import FecharModal from "../../components/FecharModal";
import {
  SelectAno,
  SelectCultivares,
  SelectSementes,
  SelectEmbalagens,
} from "../../components/Select";

const ModalMudas = ({ onClose }) => {
  FecharModal(onClose);

  const handleSubmit = (e) => {
    e.preventDefault();
    // se for só fechar:
    onClose();

    // se depois quiser enviar dados:
    // const dados = { ano, cultivar, semente, embalagem };
    // enviarParaAPI(dados).finally(onClose);
  };

  return (
    <div className="modal__backdrop" onClick={onClose}>
      <div
        id="modal-mudas"
        onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
      >
        <div className="form__modal">
          <h2>Cadastrar Produção</h2>
          <form className="form__modal-form" onSubmit={handleSubmit}>
            <SelectAno />
            <SelectCultivares />
            <SelectSementes />
            <SelectEmbalagens />

            <div className="btns__modal">
              <button className="btn__salvar-modal" type="submit">
                Salvar
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
