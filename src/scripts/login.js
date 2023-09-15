import { fazLogin, validaUsuario } from "./requests.js"

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

function vaiParaHome(){
    const buttonHome= document.querySelector("#pgHome")
    buttonHome.addEventListener("click",()=>{
        window.location.replace("../../index.html")
    })
}


function vaiParaCadastro(){
    const buttonsCadastro = document.querySelectorAll(".PgCadastro")
    console.log(buttonsCadastro)
    buttonsCadastro.forEach(button =>{
        button.addEventListener("click", (event)=>{
            event.preventDefault();
            window.location.replace("./cadastro.html")
        })
    })
}

function logar(){
    const inputs = document.querySelectorAll(".inputLogin")
    const button=document.querySelector(".login_button")
    const objetoLoginBody= {}
    let contador = 0

    button.addEventListener("click", async (event)=>{
        event.preventDefault();

        inputs.forEach(input => {
            if(input.value==""){
                contador++;
            }
            objetoLoginBody[input.name]= input.value
        })
        if(contador !==0) {
            return alert ("por favor preecha os campos e tente novamente")
        }else{
            const tokenDoUsuarioLogado = await fazLogin(objetoLoginBody)
            await validaUsuario(tokenDoUsuarioLogado)
            return tokenDoUsuarioLogado
        }
    })
}

mostraMenu()
trocaClasseBotoes()
vaiParaHome()
vaiParaCadastro()
logar()

