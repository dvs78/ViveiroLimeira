import { catalogo } from "./produtos.js";
import { renderizarCatalogo } from "./cartaoProduto.js";

const selectCultivares = document.getElementById("cultivares-select");
const radioEmbalagens = document.querySelectorAll('input[name="radio-mudas"]');

// CRIAR O SELECT

// CRIAR A LISTA DE CULTIVARES
let cultivares = [];
for (const cultivar of catalogo) {
  let cultivarObjeto = {
    id: cultivar.id,
    nome: cultivar.nome,
  };
  cultivares.push(cultivarObjeto);
}

// CRIAR O SELECT DAS CULTIVARES
function criarSelectCultivares() {
  // Remover duplicatas pelo nome
  const listaCultivares = Array.from(
    new Map(cultivares.map((cultivar) => [cultivar.nome, cultivar])).values()
  );
  // let listaCultivarSelecionada = [];
  listaCultivares.forEach((cultivar) => {
    const option = document.createElement("option");
    option.id = cultivar.id;
    option.value = cultivar.id;
    option.textContent = cultivar.nome;
    selectCultivares.appendChild(option);
  });
}
criarSelectCultivares();

// let novoCatalogo = [];
// let novoCatalogoAcionado;

// document.querySelector('input[value="tudo"]').checked = true;

// CRIAR NOVO CATÁLOGO

// CRIAR O OBJETO DE SELEÇÃO DA CULTIVAR e EMBALAGEM
let selecao = {};

// PEGAR CULTIVAR
let selecionar;
function pegarCultivar() {
  selecionar = selectCultivares.options[selectCultivares.selectedIndex].text;
  selecao.nome = selecionar;
  return selecao;
}

// selectCultivares.addEventListener("change", () => {
//   pegarCultivar();
//   pegarEmbalagem();
//   filtrarCultivarEEmbalagem(selecao.nome, selecao.embalagem);
//   novoCatalogoAcionado = filtrarCultivarEEmbalagem(
//     selecao.nome,
//     selecao.embalagem
//   );
//   novoCatalogo = [];
//   novoCatalogo.push(...novoCatalogoAcionado);
//   renderizarCatalogo(novoCatalogo);
// });

// PEGAR EMBALAGEM
// let embalagemSelecionada;
// function pegarEmbalagem() {
//   embalagemSelecionada = document.querySelector(
//     'input[name="radio-mudas"]:checked'
//   )?.value;
//   selecao.embalagem = embalagemSelecionada;

//   return selecao;
// }

// radioEmbalagens.forEach((radio) => {
//   radio.addEventListener("change", () => {
//     pegarEmbalagem();
//     pegarCultivar();
//     novoCatalogoAcionado = filtrarCultivarEEmbalagem(
//       selecao.nome,
//       selecao.embalagem
//     );
//     novoCatalogo = [];

//     novoCatalogo.push(...novoCatalogoAcionado);
//     renderizarCatalogo(novoCatalogo);
//   });
// });

// // FILTRAR
// function filtrarCultivarEEmbalagem(cultivar, embalagem) {
//   // // FILTRAR SÓ CULTIVAR
//   if (cultivar !== "Selecionar todas" && embalagem === "tudo") {
//     const resultado = catalogo.filter(
//       (produto) => produto.nome.toLowerCase() === cultivar.toLowerCase()
//     );

//     return resultado;
//   }

//   // FILTRAR SÓ EMBALAGEM
//   if (cultivar === "Selecionar todas" && embalagem !== "tudo") {
//     const resultado = catalogo.filter(
//       (produto) => produto.embalagem.toLowerCase() === embalagem.toLowerCase()
//     );
//     // const pegarEmbalagem = String(embalagem).split(" ")[0];
//     // const radioSelecionado = document.getElementById(`radio-${pegarEmbalagem}`);
//     // console.log("embalagem", radioSelecionado);

//     return resultado;
//   }

//   // FILTRAR CULTIVAR e EMBALAGEM
//   if (cultivar !== "Selecionar todas" && embalagem !== "tudo") {
//     const resultado = catalogo.filter(
//       (produto) =>
//         produto.nome.toLowerCase() === cultivar.toLowerCase() &&
//         produto.embalagem.toLowerCase() === embalagem.toLowerCase()
//     );
//     return resultado;
//   }

//   // NÃO FILTRAR NADA
//   if (cultivar === "Selecionar todas" && embalagem === "tudo") {
//     return catalogo;
//   }
// }

// export function filtrarCatalogo() {
//   console.log("filtrarCatalogo");
// }
