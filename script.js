import { cadastrarCliente } from "./requisicoes/requisicaoClientes.js";
import { formularioCadastro } from "./src/formulario.js";

document
  .getElementById("btn-add-cliente")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    let nome = await formularioCadastro().nome;
    let sobrenome = await formularioCadastro().sobrenome;
    // let telefone = await formularioCadastro().telefone;
    // let email = await formularioCadastro().email;
    // let cpf = await formularioCadastro().cpf;
    // let inscricaoEstadual = await formularioCadastro().inscricaoEstadual;
    // let rua = await formularioCadastro().rua;
    // let bairro = await formularioCadastro().bairro;
    // let cep = await formularioCadastro().cep;
    // let cidade = await formularioCadastro().cidade;
    // let estado = await formularioCadastro().estado;
    cadastrarCliente(
      nome,
      sobrenome
      // telefone,
      // email,
      // cpf,
      // inscricaoEstadual,
      // rua,
      // bairro,
      // cep,
      // cidade,
      // estado
    );
  });
