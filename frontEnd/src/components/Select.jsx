// Selects genéricos – agora aceitam value/onChange/defaultValue
import { useEffect, useMemo, useState } from "react";

/**
 * Componente base para evitar repetição
 * - Se "value" for passado => controlado pelo pai (Modal)
 * - Senão, usa estado interno
 * - Se "value" ou "defaultValue" não estiverem nas opções, adiciona temporariamente
 */
function SelectBase({
  id,
  label,
  options = [],
  value, // controlado (opcional)
  defaultValue = "", // não-controlado fallback
  onChange, // recebe string
}) {
  const [inner, setInner] = useState(defaultValue ?? "");

  // sincroniza defaultValue quando mudar (caso use não-controlado)
  useEffect(() => {
    setInner(defaultValue ?? "");
  }, [defaultValue]);

  // garante que o valor atual exista nas opções (evita "não seleciona")
  const safeOptions = useMemo(() => {
    const set = new Set(options);
    const cur = value ?? inner ?? "";
    if (cur && !set.has(cur)) set.add(cur);
    return Array.from(set);
  }, [options, value, inner]);

  const current = value !== undefined ? value : inner;

  const handleChange = (e) => {
    const val = e.target.value;
    if (value !== undefined) {
      onChange?.(val); // controlado: devolve pro pai
    } else {
      setInner(val); // não-controlado: guarda local
      onChange?.(val); // ainda assim avisa o pai, se quiser
    }
  };

  return (
    <div className="select">
      <label htmlFor={id}>{label}:</label>
      <select id={id} value={current || ""} onChange={handleChange}>
        <option value="">Selecionar {label.toLowerCase()}</option>
        {safeOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ============== ESPECÍFICOS ============== */

export const SelectAno = (props) => {
  const dbAnos = ["2025", "2026", "2027"];
  return <SelectBase id="ano" label="Ano" options={dbAnos} {...props} />;
};

export const SelectCultivares = (props) => {
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
  return (
    <SelectBase
      id="cultivar"
      label="Cultivar"
      options={dbCultivares}
      {...props}
    />
  );
};

export const SelectSementes = (props) => {
  const dbSementes = ["Câmara fria", "Semente do ano"];
  return (
    <SelectBase id="semente" label="Semente" options={dbSementes} {...props} />
  );
};

export const SelectEmbalagens = (props) => {
  // IMPORTANTE: alinhe com o texto que vem do banco!
  // Ex.: na sua tabela aparece "Saquinho 10x20 cm" e "Tubete 180 mL".
  const dbEmbalagens = [
    "Paper pot",
    "Saquinho 10x20 cm",
    "Tubete 180 mL",
    "Tubete 290 mL",
  ];
  return (
    <SelectBase
      id="embalagem"
      label="Embalagem"
      options={dbEmbalagens}
      {...props}
    />
  );
};
