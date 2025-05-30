// BUSCAR CARRINHO
export async function buscarCarrinho() {
  try {
    const response = await fetch("http://localhost:3000/carrinho");

    if (!response.ok) {
      throw new Error("Erro ao buscar carrinho");
    }
    const clientes = await response.json();
    return clientes;
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return [];
  }
}

// SALVAR CARRINHO
export async function salvarCarrinho(
  id,
  idPedido,
  ano,
  cultivar,
  semente,
  embalagem,
  precoMuda,
  desconto,
  precoMudaDesconto,
  pedido,
  precoMudaTotal
) {
  console.log(
    "função carrinho",
    id,
    idPedido,
    ano,
    cultivar,
    semente,
    embalagem,
    "precoMuda",
    precoMuda,
    desconto,
    precoMudaDesconto,
    pedido,
    precoMudaTotal
  );

  const carrinho = {
    id,
    idPedido,
    ano,
    cultivar,
    semente,
    embalagem,
    precoMuda,
    desconto,
    precoMudaDesconto,
    pedido,
    precoMudaTotal,
  };

  const response = await fetch("http://localhost:3000/carrinho", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carrinho),
  });
  console.log("response", response);
  try {
    if (!response.ok) {
      alert("Erro de resposta");
      throw new Error("Erro de resposta");
    }

    if (response.ok) {
      alert("Carrinho adicionado!!!!");
    } else {
      alert("Erro ao adicionar carrinho!!!!");
    }
  } catch (error) {
    alert("Erro ao adicionar carrinho, catch!!!!");
    // throw new Error("Erro de resposta");
  }
}

// EXCLUIR CARRINHO
export async function deletarCarrinho() {
  try {
    const response = await fetch("http://localhost:3000/carrinho", {
      method: "DELETE",
    });

    // let carrinhoPromise = await carrinho;

    if (!response.ok) {
      const error = await response.json();
      alert("Erro ao excluir carrinho: " + error.message);
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
}
