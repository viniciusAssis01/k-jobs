export function closeModal(){
    const buttonsFecharModal= document.querySelectorAll(".fecharModal")
    const dialogModalController= document.querySelector(".modalController")

    buttonsFecharModal.forEach(button =>{
        button.addEventListener("click", (event)=>{
            event.preventDefault();
            dialogModalController.close();
        })
    })
}