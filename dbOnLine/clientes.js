// // BUSCAR CLIENTES ESTÁ FUNCIONANDO
// export async function buscarClientes() {
//   try {
//     const response = await fetch("http://localhost:3000/clientes");

//     if (!response.ok) {
//       throw new Error("Erro ao buscar clientes");
//     }

//     const clientes = await response.json();

//     return clientes;
//   } catch (error) {
//     console.error("Erro ao buscar clientes", error);
//     alert("Erro ao buscar clientes");
//   }
// }

// export async function cadastrarCliente(
//   nome,
//   sobrenome,
//   telefone,
//   email,
//   cpf,
//   incricaoEstadual,
//   rua,
//   bairro,
//   cep,
//   cidade,
//   estado
// ) {
//   if (!nome) {
//     mensagem.innerText = "O nome não pode estar vazio!";
//     return;
//   }

//   try {
//     const response = await fetch(`http://localhost:${porta}/users`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nome,
//         sobrenome,
//         telefone,
//         email,
//         cpf,
//         incricaoEstadual,
//         rua,
//         bairro,
//         cep,
//         cidade,
//         estado,
//       }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       mensagem.innerText = `Cliente ${data.nome} adicionado com sucesso!`;
//       document.getElementById("nome").value = ""; // Limpa o campo
//     } else {
//       mensagem.innerText = data.error || "Erro ao adicionar cliente.";
//     }
//   } catch (error) {
//     mensagem.innerText = "Erro de conexão com o servidor.";
//   }
// }
