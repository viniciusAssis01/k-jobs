//import { renderParteDadosUsuario, renderizaCriaItemLista } from "./funcoesComuns.js"
import { criaModalEdit_PgDashboardUsuario } from "./modais.js"
import { informacoesUsuarioLogado, todosFuncionariosMsmDepartamento } from "./requests.js"


function autenticacao(){
    const token = localStorage.getItem("@empresa:tokenDoUsuario")
    if(!token){
        window.location.replace("./login.html")
    }
}

function autorizacao(){
    const is_admin = JSON.parse(localStorage.getItem("@empresa:is_admin"))
    if(is_admin){
        window.location.replace("./dashboardAdmin.html")
    }
}

function closeModal(){
    const buttonsFecharModal= document.querySelectorAll(".fecharModal")
    const dialogModalController= document.querySelector(".modalController")

    buttonsFecharModal.forEach(button =>{
        button.addEventListener("click", (event)=>{
            event.preventDefault();
            dialogModalController.close();
        })
    })
}
function abrirModalEditDadosUsuario(){
    const buttonEditar = document.querySelector(".imagemBotao")
    const dialogModalController= document.querySelector("dialog")

    buttonEditar.addEventListener("click",()=>{
        const ModalEditarDadosUsuario = criaModalEdit_PgDashboardUsuario()
        dialogModalController.append(ModalEditarDadosUsuario)
        dialogModalController.showModal()
        closeModal()
    })
}

export function criaInfoUsuario(ObjetoInfUsuario){
    const dialog = document.querySelector(".modalController");
    dialog.innerHTML = "";

    const section = document.querySelector(".SeçaoInfUsuario")
    section.innerHTML= ""
        const nameUsuario = document.createElement("h1");
        const divContainer= document.createElement("div");
            const text_email= document.createElement("p");
            const text_nivelProfissional= document.createElement("p")
            const text_ModoTrabalho= document.createElement("p")
            const figureContainer= document.createElement("figure");
                const imageButonEditar= document.createElement("img");

        nameUsuario.classList.add("nomeUsuario")
        nameUsuario.innerText= ObjetoInfUsuario.username
        divContainer.classList.add("container_text_button")
            text_email.classList.add("textEmail")
            text_email.innerText= `email: ${ObjetoInfUsuario.email}`
            text_nivelProfissional.classList.add("textNivel")
            text_nivelProfissional.innerText= ObjetoInfUsuario.professional_level
            text_ModoTrabalho.classList.add("textModoTrabalho")
            text_ModoTrabalho.innerText= ObjetoInfUsuario.kind_of_work
            figureContainer.classList.add("container_imagemBotao")
                imageButonEditar.classList.add("imagemBotao")
                imageButonEditar.src="../images/lapisEdicao.png"

        const idUsuario = localStorage.setItem("@empresa:id_user", JSON.stringify(ObjetoInfUsuario.uuid))
        
            figureContainer.append(imageButonEditar)
    divContainer.append(text_email, text_nivelProfissional, text_ModoTrabalho, figureContainer)

    section.append(nameUsuario, divContainer)

    abrirModalEditDadosUsuario()

    return section
    
}
export async function renderParteDadosUsuario(){
    const objetoComDados = await informacoesUsuarioLogado()
    const card = criaInfoUsuario(objetoComDados)
    return card
}

export function criaItemLista(arrayDeUmObjeto){
    if(arrayDeUmObjeto.length){

    const UnicoElementArray_objeto= arrayDeUmObjeto[0]
    const arrayComTodosFuncionarios = UnicoElementArray_objeto.users

    const section = document.querySelector(".Empresa_departamento")

    const nomeEmpresa = document.querySelector(".nomeEmpresa")
    nomeEmpresa.innerText = `${UnicoElementArray_objeto.name} - ${UnicoElementArray_objeto.description}`
    
    const ul = document.querySelector("ul")

    arrayComTodosFuncionarios.forEach(itemObjeto =>{
        const usuarioLogado = document.querySelector(".nomeUsuario")
    
        if(usuarioLogado.innerText!== itemObjeto.username){
            const ItemLista= document.createElement("li")
            const nomeColega= document.createElement("h3")
            const textNivel = document.createElement("p")
        
            ItemLista.classList.add("itemLista");
            nomeColega.classList.add("nomeColegaDep")
            nomeColega.innerText= itemObjeto.username
            textNivel.classList.add("nivelColegaDep")
     
            textNivel.innerText= itemObjeto.professional_level

            ItemLista.append(nomeColega, textNivel)
    
            ul.append(ItemLista)
        }
    })

    section.append(nomeEmpresa, ul)

    return section
    }
}

async function renderizaCriaItemLista(){
    const array = await  todosFuncionariosMsmDepartamento()
    const card = criaItemLista(array)
    return card
}

function logoutUsuario(){
    const buttonLogout = document.querySelector("#logout")

    buttonLogout.addEventListener("click", ()=>{
        localStorage.clear()
        window.location.replace("../../index.html")
        })
}

autenticacao()
autorizacao()
renderParteDadosUsuario()
renderizaCriaItemLista()
logoutUsuario()