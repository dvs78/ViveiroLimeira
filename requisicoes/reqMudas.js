import { mostrarMensagem } from "../src/funcoesDiversas.js";

// BUSCAR PRODUÇÃO DE MUDAS
export async function buscarProducaoMudas() {
  try {
    const response = await fetch("http://localhost:3000/mudas");

    if (!response.ok) {
      throw new Error("Erro ao buscar mudas");
    }
    const clientes = await response.json();
    return clientes;
  } catch (error) {
    console.error("Erro ao buscar mudas:", error);
    return [];
  }
}

// CADASTRAR PRODUÇÃO DE MUDAS
export async function cadastrarMudas(
  idmuda,
  ano,
  semente,
  embalagem,
  cultivar,
  producao
) {
  const muda = {
    idmuda,
    ano,
    semente,
    embalagem,
    cultivar,
    producao,
  };

  if (
    !confirm(
      `Tem certeza que deseja adicionar: ${await muda.cultivar}, ${await muda.semente}, ${await muda.embalagem}, ${
        muda.producao
      } mudas?`
    )
  )
    return;

  const response = await fetch("http://localhost:3000/mudas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(muda),
  });
  try {
    if (response.ok) {
      mostrarMensagem("Muda cadastrada com sucesso!");
    }
    if (!response.ok) {
      mostrarMensagem("Erro ao cadastrar muda!", "#ff4a47");
    }
  } catch (error) {
    mostrarMensagem("Erro ao cadastrar muda!", "#ff4a47");
  }
}

// EDITAR PRODUÇÃO DE MUDAS
export async function editarProducaoMudasBd(objeto) {
  const body = {
    ano: await objeto.ano,
    semente: await objeto.semente,
    embalagem: await objeto.embalagem,
    cultivar: await objeto.cultivar,
    producao: parseFloat(await objeto.producao),
  };

  // if(!confirm(
  //     `Tem certeza que deseja editar: ${objeto.cultivar}, ${objeto.semente}, ${
  //       objeto.embalagem
  //     }, ${objeto.producao.toLocaleString("pt-BR")}?`
  //   )){

  // }

  try {
    const response = await fetch(
      `http://localhost:3000/mudas/${await objeto.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      mostrarMensagem("Muda atualizada com sucesso!");
    } else {
      const error = await response.json();
      mostrarMensagem("Erro ao atualizar: " + error.message, "#ff4a47");
    }
  } catch (err) {
    mostrarMensagem("Erro ao atualizar: ", "#ff4a47");
  }
}

// EXCLUIR PRODUÇÃO DE MUDAS
export async function deletarProducaoMudas(objeto) {
  if (
    !confirm(
      `Tem certeza que deseja editar: ${await objeto.cultivar}, ${await objeto.semente}, ${await objeto.embalagem}, ${objeto.producao.toLocaleString(
        "pt-BR"
      )}?`
    )
  )
    return;
  try {
    const response = await fetch(`http://localhost:3000/mudas/${objeto.id}`, {
      method: "DELETE",
    });

    // let clientePromise = await cliente;

    if (response.ok) {
      mostrarMensagem("Muda excluída com sucesso!");
    } else {
      const error = await response.json();
      mostrarMensagem("Erro ao deletar", +error.message, "#ff4a47");
    }
  } catch (err) {
    mostrarMensagem("Erro de conexão com o servidor", "#ff4a47");
  }
}

// INSOMINIA - ISERTONE
// {
//   "ano": 2025,
//   "semente": "semente do ano",
//   "embalagem": "saquinho 10 x 20",
//   "cultivar": "paraíso 2",
//   "producao": 10000
// }
