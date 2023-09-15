
import { toast } from "./renderToast.js";
import {   atualizaDescricaoDeUmDepartamento,   atualizaInfUsuarioLogado,   atualizaModoDeTrabalhoNivelDoFuncionario,
  cadastraNovoDepartamento,   contrataFuncionarioParaUmDepartamento,   deletaDepartamento,   deletaUsuario,
  demiteFuncionarioDoDepartamento,   informacoesUsuarioLogado,   todasEmpresasCadastradas,   todosDepCadastrados,
  todosFuncionariosCadastrados, } from "./requests.js";

const red = "#C96047";
const green = "#22966D";

export function criaModalEdit_PgDashboardUsuario() {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";
  const modalContainer = document.createElement("div");
  const formModal = document.createElement("form");
  const divFormHeader = document.createElement("div");
  const titleForm = document.createElement("h1");
  const buttonFecharModal = document.createElement("button");

  const divFormInputsContainer = document.createElement("div");
  const inputName = document.createElement("input");
  const inputEmail = document.createElement("input");
  const inputPassword = document.createElement("input");
  const buttonEditar = document.createElement("button");

  modalContainer.classList.add("modalContainerEditUsuario_usuario");
  formModal.classList.add("formModal");
  divFormHeader.classList.add("form_header");
  titleForm.classList.add("EditarPerfil");
  titleForm.innerText = "Editar perfil";
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divFormInputsContainer.classList.add("form_inputs");
  inputName.classList.add("inputsModalEditUser_User", "inputName")
  inputName.type = "text";
  inputName.placeholder = "Seu nome";
  inputName.name = "username";

  inputEmail.classList.add("inputsModalEditUser_User", "inputEmail")
  inputEmail.type = "email";
  inputEmail.placeholder = "Seu e-mail";
  inputEmail.name = "email";

  inputPassword.classList.add("inputsModalEditUser_User", "inputSenha")
  inputPassword.type = "password";
  inputPassword.placeholder = "sua senha";
  inputPassword.name = "password";

  buttonEditar.classList.add("buttonEditar");
  buttonEditar.innerText = "Editar Perfil";

  buttonEditar.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!inputName.value || !inputEmail.value || !inputPassword.value) {
      toast("preecha os campos e tente novamente", red)
    } else {
      const objetoEditBody = {
        username: inputName.value,
        password: inputPassword.value,
        email: inputEmail.value,
      };
      await atualizaInfUsuarioLogado(objetoEditBody);

      dialog.close();

      toast("informações atualizadas com sucesso", green)

      setTimeout(()=>{
        window.location.reload();
      }, 2000)

    }
  });

  divFormHeader.append(titleForm, buttonFecharModal);
  divFormInputsContainer.append(
    inputName,
    inputEmail,
    inputPassword,
    buttonEditar
  );
  formModal.append(divFormHeader, divFormInputsContainer);
  modalContainer.append(formModal);

  return modalContainer;
}


export function modalEditUsuario_pgDashboardAdmin(objeto) {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const modal_divHeader = document.createElement("div");
  const Modal_title = document.createElement("h1");
  const buttonFecharModal = document.createElement("button");
  const modal_divSelects_Button = document.createElement("div");
  const selectModalidade = document.createElement("select");
  const optionModalidade = document.createElement("option");
  const optionModalidadePresencial = document.createElement("option");
  const optionModalidadeHome = document.createElement("option");
  const optionModalidadHibrido = document.createElement("option");
  const selectNivel = document.createElement("select");
  const optionNivel = document.createElement("option");
  const optionNivelJunior = document.createElement("option");
  const optionNivelPleno = document.createElement("option");
  const optionNivelSenior = document.createElement("option");
  const buttonEditarUsuario = document.createElement("button");

  modalContainer.classList.add("modalContainer_eidtarUsuario");
  modal_divHeader.classList.add("header");
  Modal_title.classList.add("modalEditarUser_admin_title");
  Modal_title.innerText = "Editar usuario";
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  modal_divSelects_Button.classList.add("select_button");
  selectModalidade.classList.add(
    "selectModalidade_modalEdit_admin",
    "selectModalEditUser_admin"
  );
  optionModalidade.value = " ";
  optionModalidade.innerText = "Selecionar Modalidade de Trabalho";
  optionModalidadePresencial.value = "presencial";
  optionModalidadePresencial.innerText = "Presencial";
  optionModalidadeHome.value = "home office";
  optionModalidadeHome.innerText = "Home office";
  optionModalidadHibrido.value = "hibrido";
  optionModalidadHibrido.innerText = "Hibrido";
  selectNivel.classList.add(
    "selectNivel_modalEdit_admin",
    "selectModalEditUser_admin"
  );
  optionNivel.value = "";
  optionNivel.innerText = "Selecionar Nivel profissional";
  optionNivelJunior.value = "júnior";
  optionNivelJunior.innerText = "júnior";
  optionNivelPleno.value = "pleno";
  optionNivelPleno.innerText = "pleno";
  optionNivelSenior.value = "sênior";
  optionNivelSenior.innerText = "sênior";
  buttonEditarUsuario.classList.add("Editar");
  buttonEditarUsuario.innerText = "Editar";

  selectNivel.append(
    optionNivel,
    optionNivelJunior,
    optionNivelPleno,
    optionNivelSenior
  );
  selectModalidade.append(
    optionModalidade,
    optionModalidadePresencial,
    optionModalidadeHome,
    optionModalidadHibrido
  );
  modal_divSelects_Button.append(
    selectModalidade,
    selectNivel,
    buttonEditarUsuario
  );
  modal_divHeader.append(Modal_title, buttonFecharModal);
  modalContainer.append(modal_divHeader, modal_divSelects_Button);

  return modalContainer;
}
/* -------------------------------------------------------------- */
export function modalDeletaUsuario(objeto) {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const buttonFecharModal = document.createElement("button");
  const divContainer = document.createElement("div");
  const title = document.createElement("h1");
  const buttonDeletar = document.createElement("button");

  modalContainer.classList.add("modalContainer_deletUsuario");
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divContainer.classList.add("deletarUsuario_titleButtonContainer");
  title.classList.add("titleModal");
  title.innerText = `Ralmente deseja remover o usuario ${objeto.username}?`;
  buttonDeletar.classList.add("buttonDeletarUsuario");
  buttonDeletar.innerText = "Deletar";

  divContainer.append(title, buttonDeletar);
  modalContainer.append(buttonFecharModal, divContainer);

  return modalContainer;
}

export function modalDeletaDep(objeto) {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const buttonFecharModal = document.createElement("button");
  const divContainer = document.createElement("div");
  const title = document.createElement("h1");
  const buttonDeletar = document.createElement("button");

  modalContainer.classList.add("modalContainer_deletDepartamento");
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divContainer.classList.add("deletarDep_titleButtonContainer");
  title.classList.add("titleModal");
  title.innerText = `Ralmente deseja deletar o departamento ${objeto.name} e demitir seus funcionarios?`;
  buttonDeletar.classList.add("buttonDeletarDep");
  buttonDeletar.innerText = "confirmar";

  divContainer.append(title, buttonDeletar);
  modalContainer.append(buttonFecharModal, divContainer);
  return modalContainer;
}

export function modalEditaDep(objeto) {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const buttonFecharModal = document.createElement("button");
  const divContainer = document.createElement("div");
  const titleModal = document.createElement("h1");
  const texteare = document.createElement("textarea");
  const buttonEditar = document.createElement("button");

  modalContainer.classList.add("modalContainer_editDep");
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divContainer.classList.add("editDep_container");
  titleModal.classList.add("tituloModal");
  titleModal.innerText = "Editar Departamento";
  texteare.classList.add("textAreaModalEditarDep");
  texteare.innerText = `${objeto.description}`;

  buttonEditar.classList.add("salvarAlteracoes");
  buttonEditar.innerText = "salvar alterações";

  divContainer.append(titleModal, texteare, buttonEditar);
  modalContainer.append(buttonFecharModal, divContainer);
  return modalContainer;
}

export function modalCriaDep() {
  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const buttonFecharModal = document.createElement("button");
  const divContainer = document.createElement("div");
  const titleModal = document.createElement("h1");
  const inputNameDep = document.createElement("input");
  const inputNaDescricaoDep = document.createElement("input");
  const selectEmpresas = document.createElement("select");
  const optionEmpresa = document.createElement("option");

  const buttonCriarDep = document.createElement("button");

  modalContainer.classList.add("modalContainer_criaDep");
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divContainer.classList.add("criaDep_container");
  titleModal.classList.add("tituloModal");
  titleModal.innerText = "Criar Departamento";
  inputNameDep.classList.add("input_nameDep", "inputCriaDep");
  inputNameDep.type = "text";
  inputNameDep.placeholder = "Nome do departamento";
  inputNameDep.name = "name";
  inputNaDescricaoDep.classList.add("input_descricao", "inputCriaDep");
  inputNaDescricaoDep.type = "text";
  inputNaDescricaoDep.placeholder = "Descricao";
  inputNaDescricaoDep.name = "description";
  selectEmpresas.classList.add("selectEmpresas", "inputCriaDep");
  selectEmpresas.append(optionEmpresa);
  optionEmpresa.value = "";
  optionEmpresa.innerText = "Selecionar Empresa";

  const OptionTodasEmpresas = async function () {
    const listaTodasEmpresas = await todasEmpresasCadastradas();
    listaTodasEmpresas.forEach((empresa) => {
      const option = document.createElement("option");
      option.value = empresa.uuid;
      option.innerText = empresa.name;
      selectEmpresas.append(option);
    });
  };
  OptionTodasEmpresas();

  buttonCriarDep.classList.add("buttonCriarDep");
  buttonCriarDep.innerText = "Criar Departamento";

  divContainer.append(
    titleModal,
    inputNameDep,
    inputNaDescricaoDep,
    selectEmpresas,
    buttonCriarDep
  );
  modalContainer.append(buttonFecharModal, divContainer);
  return modalContainer;
}

export async function novoModalViewDep(objeto, listaUsuarios){
    const todosUsuarios = await todosFuncionariosCadastrados();
    const usuariosDoMsmDepartamento = todosUsuarios.filter(
    (item) => item.department_uuid == objeto.uuid);

    const dialog = document.querySelector(".modalController");
    dialog.innerHTML = "";

    const modalContainer = document.createElement("div");
    const buttonFecharModal = document.createElement("button");
    const divContainer1= document.createElement("div")
        const titleDep= document.createElement("h1")
        const divContainerDescriSelect= document.createElement("div")
            const div_descricao= document.createElement("div")
                const titleDescriDep= document.createElement("h3")
                const textEmpresaPertecent= document.createElement("p")
            const div_select= document.createElement("div")
                const selectUser= document.createElement("select")
                    const optionUser= document.createElement("option")
                selectUser.append("optionUser")
                listaUsuarios.forEach((usuario)=>{
                    const option = document.createElement("option");
                    option.innerText=usuario.username
                    option.value=usuario.uuid

                    selectUser.appendChild(option)
                })
                const buttonContratar= document.createElement("button");
    const ul= document.createElement("ul");
    usuariosDoMsmDepartamento.forEach((usuario)=>{

        const li= criaUsuarioContratado(objeto, usuario)
          ul.append(li)
    })

    modalContainer.classList.add("modalContainer_viewDep");
        buttonFecharModal.classList.add("fecharModal");
        buttonFecharModal.innerText = "X";
        divContainer1.classList.add("viewDep_containerTitleDescSelect")
            titleDep.classList.add("nomeDep")
            titleDep.innerText=`${objeto.name}`
            divContainerDescriSelect.classList.add("container_descricaoSelect")
              div_descricao.classList.add("viewdep_containerDescricao")
                titleDescriDep.innerText=`${objeto.description}`
                textEmpresaPertecent.innerText=`${objeto.companies.name}`;
              div_select.classList.add("viewdep_selectButton")
                selectUser.classList.add("selectUsuarios")
                  optionUser.value=""
                  optionUser.innerText="Selecionar Usuario"
                buttonContratar.classList.add("Contratar");
                buttonContratar.innerText="Contratar"
        ul.classList.add("listaUsuariosModalView");

    buttonContratar.addEventListener("click", async()=>{
      if(selectUser.value ==""){
        toast("selecione um usuario e tente novamente", red)
      }else{
        const data = {
          user_uuid: selectUser.value,
          department_uuid: objeto.uuid,
        }
        await contrataFuncionarioParaUmDepartamento(data);

        const actualOptionIndex= selectUser.selectedIndex
        const actualOption= selectUser.options[actualOptionIndex]
        actualOption.remove()
        await todosFuncionariosCadastrados().then((res)=>{

          const usuariosDoMsmDepartamento1 = res.filter((item)=>item.department_uuid == objeto.uuid)
          ul.innerHTML=""
  
          usuariosDoMsmDepartamento1.forEach((usuario)=>{
            const li= criaUsuarioContratado(objeto, usuario)
            ul.appendChild(li)

          })
        })
      }
    })
    div_select.append(selectUser, buttonContratar)
    div_descricao.append(titleDescriDep, textEmpresaPertecent)
    divContainerDescriSelect.append(div_descricao, div_select)
    divContainer1.append(titleDep, divContainerDescriSelect)
    modalContainer.append(buttonFecharModal, divContainer1, ul)

    return modalContainer
}

export async function modalViewDep(objeto, listaUsuarios) {
  console.log(objeto);
  const todosUsuarios = await todosFuncionariosCadastrados();
  const usuariosDoMsmDepartamento = todosUsuarios.filter(
    (item) => item.department_uuid == objeto.uuid
  );

  const dialog = document.querySelector(".modalController");
  dialog.innerHTML = "";

  const modalContainer = document.createElement("div");
  const buttonFecharModal = document.createElement("button");
  const divContainer_description = document.createElement("div");
  const container_text = document.createElement("div");
  const titleDep = document.createElement("h3");
  const nomeDaEmpresa = document.createElement("p");
  const container_select = document.createElement("div");
  const selectUser = document.createElement("select");
  const optionUser = document.createElement("option");
  selectUser.append(optionUser);
  listaUsuarios.forEach((usuario) => {
    const option = document.createElement("option");
    option.innerText = usuario.username;
    option.value = usuario.uuid;

    selectUser.append(option);
  });

  const buttonContratar = document.createElement("button");
  const ul = document.createElement("ul");

  usuariosDoMsmDepartamento.forEach((usuario) => {
    const [descricao, botao] = criaUsuarioContratado(objeto, usuario);
    ul.append(descricao, botao);
  });

  modalContainer.classList.add("modalContainer_viewDep");
  buttonFecharModal.classList.add("fecharModal");
  buttonFecharModal.innerText = "X";
  divContainer_description.classList.add("view_containerDescrition");
  container_text.classList.add("containerDescrition_containerTexts");
  titleDep.classList.add("titleNameUsuario");
  titleDep.innerText = `${objeto.name}`;
  nomeDaEmpresa.classList.add("textNomeEmpresa");
  nomeDaEmpresa.innerText = `${objeto.companies.name}`;
  container_select.classList.add("containerDescrition_containerSelectButton");
  selectUser.classList.add("selectUsuarios");
  optionUser.value = "";
  optionUser.innerText = "Selecionar usuario";
  buttonContratar.classList.add("Contratar");
  buttonContratar.innerText = "Contratar";
  ul.classList.add("listaUsuariosModalView");

  buttonContratar.addEventListener("click", async () => {
    if (selectUser.value == "") {
      alert("selecione um usuario e tente novamente");
    } else {
      const data = {
        user_uuid: selectUser.value,
        department_uuid: objeto.uuid,
      };
      await contrataFuncionarioParaUmDepartamento(data);
      selectUser.value = "";
      const todosUsuarios1 = await todosFuncionariosCadastrados();
      const usuariosDoMsmDepartamento1 = todosUsuarios1.filter(
        (item) => item.department_uuid == objeto.uuid
      );
      ul.innerHTML = "";
      usuariosDoMsmDepartamento1.forEach((usuario) => {
        const [descricao, botao] = criaUsuarioContratado(objeto, usuario);
        ul.append(descricao, botao);
      });
    }
  });

  container_select.append(selectUser, buttonContratar);
  container_text.append(titleDep, nomeDaEmpresa);
  divContainer_description.append(container_text, container_select, ul);
  modalContainer.append(buttonFecharModal, divContainer_description);

  return modalContainer;
} 


function criaUsuarioContratado(departamento, item) {
  const li = document.createElement("li");
  const li_containerDescricao = document.createElement("div");
  const nomeUsuario = document.createElement("h3");
  const nivelUsuario = document.createElement("p");
  const nomeEmpresa = document.createElement("p");
  const li_containerButton = document.createElement("div");
  const buttonDesligarFuncionario = document.createElement("button");

  li_containerDescricao.classList.add("descricao_container");
  nomeUsuario.classList.add("itemListaUsuarios_titlenomeUsuario");
  nomeUsuario.innerText = `${item.username}`;
  nivelUsuario.classList.add("itemListaUsuarios_textNivelUsuario");
  nivelUsuario.innerText = `${item.professional_level}`;
  nomeEmpresa.classList.add("itemListaUsuarios_textNivelUsuario");
  nomeEmpresa.innerText = `${departamento.companies.name}`;
  li_containerButton.classList.add("ItemListaUsuarioModalView_containerButton");
  buttonDesligarFuncionario.classList.add("desligar_funcionario");
  buttonDesligarFuncionario.innerText = "Desligar";
  buttonDesligarFuncionario.addEventListener("click", async () => {
    await demiteFuncionarioDoDepartamento(item.uuid);
    toast("Funcionario demitido do departamento com sucesso", green)
    setTimeout(()=>{
            window.location.reload();
        },1000 )
  });

  li_containerDescricao.append(nomeUsuario, nivelUsuario, nomeEmpresa);
  li_containerButton.append(buttonDesligarFuncionario);
  //
  li.append(li_containerDescricao, li_containerButton)

  return li
}

