import { setoresDasEmpresas, EmpresasPorSetor } from "./requests.js"

function mostraMenu(){
    const buttonMenu= document.querySelector(".menu-hamburguer")
    const navContainer= document.querySelector(".nav__container")

    buttonMenu.addEventListener("click",() =>{

        if(navContainer.classList.contains("show")){
            navContainer.classList.add("removeShowMenu")

            setTimeout(()=>{
                navContainer.classList.remove("show", "removeShowMenu")
            }, 950)
        }else{
            navContainer.classList.add("show")
        }
    })
}

function trocaClasseBotoes(){
    const buttons = document.querySelectorAll("button")
    buttons.forEach(button =>{
        if(document.body.clientWidth <1440){
            button.classList.add("mobileLoginCadastro")
            button.classList.remove("desktopLoginCadastro")
        }else if(document.body.clientWidth >=1440){
            button.classList.remove("mobileLoginCadastro")
            button.classList.add("desktopLoginCadastro")
        }
    })
}
 
function autenticacao(){
    const token = localStorage.getItem("@empresa:tokenDoUsuario")
    if(token){
        window.location.replace("./src/pages/cadastro.html")
    }
}

function vaParaPagCadastro(){
    const buttonCadastro= document.querySelector("#cadastro")
    buttonCadastro.addEventListener("click",()=>{
        window.location.replace("./src/pages/cadastro.html")
    })
}
function vaParaPaginaLogin(){
    const buttonLogin = document.querySelector("#login")
    buttonLogin.addEventListener("click",()=>{
        window.location.replace("./src/pages/login.html")
    })
}

function CriaitemDaLista(array){
    const ul= document.querySelector(".listaEmpresas");
    ul.innerHTML= ""
    array.forEach(item =>{
        const li= document.createElement("li")
        const li_title= document.createElement("h2")
        const li_divContainerTextCardHome= document.createElement("div")
        const li_textHoras= document.createElement("p")
        const li_TextSetor= document.createElement("p")

        li_title.innerText= item.name
        li_textHoras.innerText= item.opening_hours
        li_TextSetor.innerText=item.sectors.description
        
        li_divContainerTextCardHome.append(li_textHoras, li_TextSetor)
        li.append(li_title, li_divContainerTextCardHome)

        ul.append(li)
    })
}

async function criarOptionSelect(){
    const Select = document.querySelector(".selectHome");
    const sectors = await setoresDasEmpresas()
    sectors.forEach(sector =>{
        const option = document.createElement("option")
        option.innerText= sector.description
        option.value= sector.description

        Select.append(option)
    })
    
    Select.addEventListener("change", async()=>{
        const valor = Select.value
        const empresas = await EmpresasPorSetor(valor)
        CriaitemDaLista(empresas)
    })

}


mostraMenu()
trocaClasseBotoes()
autenticacao()
vaParaPaginaLogin()
vaParaPagCadastro()
const empresas = await EmpresasPorSetor("")
CriaitemDaLista(empresas)
criarOptionSelect()

