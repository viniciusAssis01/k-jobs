
import { closeModal } from "./funcoesComuns.js";
import {   modalCriaDep,   modalDeletaDep,   modalDeletaUsuario,   modalEditaDep,   modalEditUsuario_pgDashboardAdmin,
  modalViewDep,   novoModalViewDep, } from "./modais.js";
import { toast } from "./renderToast.js";
import {   todasEmpresasCadastradas,   todosDepDeUmaEmpresa,   todosDepCadastrados,   todosFuncionariosCadastrados,   atualizaModoDeTrabalhoNivelDoFuncionario,  deletaUsuario,  todosFuncionariosNaoContratados,  deletaDepartamento,  atualizaDescricaoDeUmDepartamento,  cadastraNovoDepartamento,} from "./requests.js";

const red = "#C96047";
const green = "#22966D";

function autenticacao() {
  const token = localStorage.getItem("@empresa:tokenDoUsuario");
  if (!token) {
    window.location.replace("./login.html");
  }
}

function autorizacao() {
  const is_admin = JSON.parse(localStorage.getItem("@empresa:is_admin"));
  if (!is_admin) {
    window.location.replace("./dashboardUsuario.html");
  }
}

function logoutUsuario() {
  const buttonLogout = document.querySelector("#logout");

  buttonLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location.replace("../../index.html");
  });
}

function abrirModalCriarDep() {
  const buttonCriarDep = document.querySelector(".buttonCriarDepartamento");
  const dialogModalController = document.querySelector("dialog");

  buttonCriarDep.addEventListener("click", async () => {
    const modalCriaDepeartamento = modalCriaDep();
    dialogModalController.append(modalCriaDepeartamento);
    dialogModalController.showModal();
    closeModal();

    const inputNameDep = document.querySelector(".input_nameDep");
    const inputDescricao = document.querySelector(".input_descricao");
    const selectEmpresas = document.querySelector(".selectEmpresas");

    const btnCriarDepartamento = document.querySelector(".buttonCriarDep");
    btnCriarDepartamento.addEventListener("click", async () => {
      if (
        !inputNameDep.value ||
        !inputDescricao.value ||
        !selectEmpresas.value
      ) {
        toast("preecha os campos e tente novamente", red);
      } else {
        const objetoCorpoCriarDep = {
          name: inputNameDep.value,
          description: inputDescricao.value,
          company_uuid: selectEmpresas.value,
        };
        await cadastraNovoDepartamento(objetoCorpoCriarDep);
        dialogModalController.close();
        toast("Departamento criado com sucesso", green)
        const departamentos = await todosDepCadastrados();
        criaItemDaListaDep(departamentos);
      }
    });
  });
}


export function criaItemDaListaDep(array) {
  const ul = document.querySelector(".listaDepartamentos");
  ul.innerHTML = "";
  const dialogModalController = document.querySelector("dialog");

  array.forEach((itemDep) => {
    const li = document.createElement("li");
    const li_textsContainer = document.createElement("div");
    const text_departamentName = document.createElement("p");
    const text_departamentDescription = document.createElement("p");
    const text_CompanyName = document.createElement("p");
    const li_buttonsContainer = document.createElement("div");
    const button_view = document.createElement("figure");
    const imgView = document.createElement("img");
    const button_edit = document.createElement("figure");
    const imgEdit = document.createElement("img");
    const button_delete = document.createElement("figure");
    const imgDelete = document.createElement("img");

    li_textsContainer.classList.add("textsContainer");
    text_departamentName.classList.add("departamentName");
    text_departamentName.innerText = itemDep.name;
    text_departamentDescription.classList.add("departamentDescription");
    text_departamentDescription.innerText = itemDep.description;
    text_CompanyName.classList.add("companyName");
    text_CompanyName.innerText = itemDep.companies.name;
    li_buttonsContainer.classList.add("buttonsContainer");
    button_view.classList.add("figureListaDep", "figureBotaoViewDep");
    imgView.classList.add("imgListaDep");
    imgView.src = "../images/olho.png";
    button_edit.classList.add("figureListaDep", "figureBotaoEditDep");
    imgEdit.classList.add("imgListaDep");
    imgEdit.src = "../images/lapisEdicao.png";
    button_delete.classList.add("figureListaDep", "figureBotaoDeleteDep");
    imgDelete.classList.add("imgListaDep");
    imgDelete.src = "../images/lixeira.png";

    button_delete.addEventListener("click", () => {
      const modalDeletaDepartamento = modalDeletaDep(itemDep);
      dialogModalController.append(modalDeletaDepartamento);
      dialogModalController.showModal();
      closeModal();

      const btnDeletarDepartamento =
        document.querySelector(".buttonDeletarDep");
      btnDeletarDepartamento.addEventListener("click", async () => {
        await deletaDepartamento(itemDep.uuid);
        dialogModalController.close();
        const departamentos = await todosDepCadastrados();
        criaItemDaListaDep(departamentos);
      });
    });
    button_edit.addEventListener("click", () => {
      const modalEditaDepartamento = modalEditaDep(itemDep);
      dialogModalController.append(modalEditaDepartamento);
      dialogModalController.showModal();
      closeModal();

      const btnEditarDepartamento = document.querySelector(".salvarAlteracoes");
      btnEditarDepartamento.addEventListener("click", async () => {
        const textArea = document.querySelector(".textAreaModalEditarDep");
        if (textArea.value == "") {
          toast("Por favor, preecha os campos e tente novamente", red)
        } else {
          const data = {
            description: textArea.value,
          };
          await atualizaDescricaoDeUmDepartamento(itemDep.uuid, data);
          dialogModalController.close();
          toast("descricao do departamento atualizada com sucesso", green)
          const departamentos = await todosDepCadastrados();
          criaItemDaListaDep(departamentos);
        }
      });
    });
    button_view.addEventListener("click", async () => {
      const listaUsuarios = await todosFuncionariosNaoContratados();
      const modalVisualizarDep = await novoModalViewDep(itemDep, listaUsuarios);
      dialogModalController.append(modalVisualizarDep);
      dialogModalController.showModal();
      closeModal();
    });

    button_view.append(imgView);
    button_edit.append(imgEdit);
    button_delete.append(imgDelete);
    li_buttonsContainer.append(button_view, button_edit, button_delete);
    li_textsContainer.append(
      text_departamentName,
      text_departamentName,
      text_departamentDescription
    );
    li.append(li_textsContainer, li_buttonsContainer);

    ul.append(li);
  });
}

async function criaOptionSelectLIstaDep() {
  const select = document.querySelector(".selectAdmin");
  const TodasEmpresas = await todasEmpresasCadastradas();
  TodasEmpresas.forEach((itemEmpresa) => {
    const option = document.createElement("option");
    option.value = itemEmpresa.uuid;
    option.innerText = itemEmpresa.name;
    select.append(option);
  });
}
async function filterDepartamentsByCompanies() {
  let departamentos;
  const select = document.querySelector(".selectAdmin");
  select.addEventListener("change", async () => {
    const valor = select.value;

    if (valor == "") {
      departamentos = await todosDepCadastrados();
    } else {
      departamentos = await todosDepDeUmaEmpresa(valor);
    }
    criaItemDaListaDep(departamentos);
  });
}

export function criaItemListaFuncionarios(arrayObjetosFuncionarios) {
  const dialog = document.querySelector(".modalController");
  const ul = document.querySelector(".ListaUsuarios");
  ul.innerHTML = "";
  const dialogModalController = document.querySelector("dialog");

  arrayObjetosFuncionarios.forEach((itemFuncionario) => {
    const li = document.createElement("li");
    const li_textsContainer = document.createElement("div");
    const text_userName = document.createElement("h3");
    const text_nivelProfissional = document.createElement("p");
    const text_nomeCompany = document.createElement("p");

    const li_buttonsContainer = document.createElement("div");
    const button_edit = document.createElement("figure");
    const imgEdit = document.createElement("img");
    const button_delete = document.createElement("figure");
    const imgDelete = document.createElement("img");

    li_textsContainer.classList.add("textContainer");
    text_userName.classList.add("nomeUsuario", "li_title");
    text_userName.innerText = itemFuncionario.username;
    text_nivelProfissional.classList.add("nivelProfissional", "li_text");
    text_nivelProfissional.innerText = itemFuncionario.professional_level;
    text_nomeCompany.classList.add("companyName", "li_text");
    text_nomeCompany.innerText = itemFuncionario.kind_of_work;
    li_buttonsContainer.classList.add("buttonsContainer");
    button_edit.classList.add("figureListaUsuarios", "figureBotaoEditar");
    imgEdit.src = "../images/lapisEdicao.png";
    button_delete.classList.add("figureListaUsuarios", "figureBotaoDeletUser");
    imgDelete.src = "../images/lixeira.png";
    button_edit.addEventListener("click", async () => {
      const modalEditUsuario =
        modalEditUsuario_pgDashboardAdmin(itemFuncionario);
      dialogModalController.append(modalEditUsuario);
      dialogModalController.showModal();
      closeModal();

      const btn = document.querySelector(".Editar");
      btn.addEventListener("click", async () => {
        const selectModalidade = document.querySelector(
          ".selectModalidade_modalEdit_admin"
        );
        const selectNivel = document.querySelector(
          ".selectNivel_modalEdit_admin"
        );
        if (!selectModalidade.value || !selectNivel) {
          toast("preecha os campos e tente novamente", red)
        } else {
          const objetoEditBody = {
            kind_of_work: selectModalidade.value,
            professional_level: selectNivel.value,
          };
          await atualizaModoDeTrabalhoNivelDoFuncionario(
            itemFuncionario.uuid,
            objetoEditBody
          );
          dialog.close();

          toast("informações atualizadas com sucesso", green)
          await pegarUsuarios();
        }
      });
    });
    button_delete.addEventListener("click", async () => {
      const ModalDeletausuario_admin = modalDeletaUsuario(itemFuncionario);
      dialogModalController.append(ModalDeletausuario_admin);
      dialogModalController.showModal();
      closeModal();

      const btnDeleteUsuario = document.querySelector(".buttonDeletarUsuario");
      btnDeleteUsuario.addEventListener("click", async () => {
        await deletaUsuario(itemFuncionario.uuid);
        dialog.close();
        toast("Usuario Deletado com sucesso", green)
        await pegarUsuarios();
      });
    });
    button_edit.append(imgEdit);
    button_delete.append(imgDelete);
    li_buttonsContainer.append(button_edit, button_delete);
    li_textsContainer.append(
      text_userName,
      text_nivelProfissional,
      text_nomeCompany
    );
    li.append(li_textsContainer, li_buttonsContainer);

    ul.append(li);
  });
}
export async function pegarUsuarios() {
  const listaUsuarios = await todosFuncionariosCadastrados();

  const listaSemAdmin = listaUsuarios.filter(
    (item) => item.username !== "ADMIN"
  );

  criaItemListaFuncionarios(listaSemAdmin);
}

autenticacao()
autorizacao()

logoutUsuario();
abrirModalCriarDep();
await criaOptionSelectLIstaDep();
filterDepartamentsByCompanies();
const departamentos = await todosDepCadastrados();
criaItemDaListaDep(departamentos);
pegarUsuarios();
