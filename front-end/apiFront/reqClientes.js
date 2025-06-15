// FETCH ou AXIOS
// AXIOS parece melhor
import axios from "axios";

import { capitalizePalavras } from "../src/utilitarios/funcoesDiversas.js";

// const BASE_URL = "http://localhost:3000/api";
const BASE_URL = "https://viveirolimeira.onrender.com/api";

// BUSCAR CLIENTES
export async function getAllClients() {
  try {
    const response = await axios.get(`${BASE_URL}/clientes`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return [];
  }
}

//   nome,
//   sobrenome,
//   nomeCompleto,
//   telefone,
//   email,
//   cpf,
//   inscricaoEstadual,
//   rua,
//   bairro,
//   cep,
//   cidade,
//   estado

export async function insertOneClient(cliente) {
  try {
    const response = await axios.post(`${BASE_URL}/clientes`, cliente);

    return response.data;
  } catch (error) {
    return null;
  }
}

export async function updateByIdClient(id, cliente) {
  try {
    const response = await axios.put(`${BASE_URL}/clientes/${id}`, cliente);

    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao editar cliente:", error);

    return false;
  }
}

export async function deleteByIdClient(cliente) {
  const confirmado = confirm(
    `Tem certeza que deseja excluir: ${capitalizePalavras(
      cliente.nomecompleto
    )}?`
  );
  if (!confirmado) return false;

  try {
    const response = await axios.delete(`${BASE_URL}/clientes/${cliente.id}`);

    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Erro ao excluir cliente:", error);

    return false;
  }
}
