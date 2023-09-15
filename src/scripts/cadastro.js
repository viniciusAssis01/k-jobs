import { cadastraUsuario } from "./requests.js"

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
    const buttons = document.querySelectorAll(".buttonHeader")
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
        window.location.replace("./login.html")
    }
}

function voltaPgHome(){
    const buttonHome = document.querySelectorAll(".pgHome")
    buttonHome.forEach(button =>{
        button.addEventListener("click", (event)=>{
            event.preventDefault();
            window.location.replace("../../index.html")
        })
    })
}
function voltaLogin(){
    const buttonLogin= document.querySelector("#pgLogin");
    buttonLogin.addEventListener("click", (event)=>{
        window.location.replace("./login.html")
    })
}

function fazCadastro(){
    const buttonCadastrar = document.querySelector("#cadastrar")
    const inputs = document.querySelectorAll(".inputsCadastro")
    const selectPropriedade= document.querySelector(".select")
    let objetoRegisterBody={}
    let contador= 0

    buttonCadastrar.addEventListener("click", async(event)=>{
        event.preventDefault();

        inputs.forEach(input =>{
            if(input.value ==""){
                contador++;
            }
            objetoRegisterBody[input.name]= input.value
        })
        if(contador!==0){
            return alert("Por favor preecha os campos e tente novamente")
        }else{
           objetoRegisterBody[selectPropriedade.name]=selectPropriedade.value
            const novoUsuario= await cadastraUsuario(objetoRegisterBody)
            return novoUsuario
        }
    })
}
mostraMenu()
trocaClasseBotoes()
voltaPgHome()
voltaLogin()
autenticacao()
fazCadastro()

