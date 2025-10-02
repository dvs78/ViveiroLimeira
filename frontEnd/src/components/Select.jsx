import { useState } from "react";

export const SelectAno = () => {
  const dbAnos = ["2025", "2026", "2027"];
  const [ano, setAno] = useState("");
  return (
    <div className="select">
      <label htmlFor="ano">Ano:</label>
      <select
        id="ano"
        value={ano || ""}
        onChange={(e) => setAno(e.target.value)}
      >
        <option value="">Selecionar ano</option>
        {dbAnos.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectCultivares = () => {
  const dbCultivares = [
    "Arara",
    "Catuaí 62",
    "Catuaí 144",
    "Catucaí 2SL",
    "Catucaí 24-137",
    "IBC 12",
    "Mundo Novo",
    "Paraíso 2",
    "Topázio",
    "Obatã",
  ];

  const [cultivar, setCultivar] = useState("");
  return (
    <div className="select">
      <label htmlFor="cultivar">Cultivar:</label>
      <select
        id="cultivar"
        value={cultivar || ""}
        onChange={(e) => setCultivar(e.target.value)}
      >
        <option value="">Selecionar cultivar</option>
        {dbCultivares.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectSementes = () => {
  const dbSementes = ["Câmara fria", "Semente do ano"];

  const [semente, setSemente] = useState("");
  return (
    <div className="select">
      <label htmlFor="semente">Semente:</label>
      <select
        id="semente"
        value={semente || ""}
        onChange={(e) => setSemente(e.target.value)}
      >
        <option value="">Selecionar semente</option>
        {dbSementes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectEmbalagens = () => {
  const dbEmbalagens = [
    "Paper pot",
    "Saquinho",
    "Tubete 180 mL",
    "Tubete 290 mL",
  ];

  const [embalagem, setEmbalagem] = useState("");
  return (
    <div className="select">
      <label htmlFor="embalagem">Embalagem:</label>
      <select
        id="embalagem"
        value={embalagem || ""}
        onChange={(e) => setEmbalagem(e.target.value)}
      >
        <option value="">Selecionar embalagem</option>
        {dbEmbalagens.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
