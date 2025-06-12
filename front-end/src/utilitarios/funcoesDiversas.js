// Colocar a primeira letra em maiúsculo, com exceção de preposições
export function capitalizePalavras(texto) {
  const preposicoes = [
    "da",
    "de",
    "do",
    "das",
    "dos",
    "e",
    "em",
    "no",
    "na",
    "nos",
    "nas",
    "a",
    "ao",
    "aos",
    "as",
  ];

  return texto
    .toLowerCase()
    .replace(/-/g, " ") // substitui hífen por espaço
    .replace(/\s+/g, " ") // elimina espaços duplos ou triplos
    .trim() // remove espaços nas extremidades
    .split(" ")
    .map((palavra, index) => {
      if (index !== 0 && preposicoes.includes(palavra)) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}
