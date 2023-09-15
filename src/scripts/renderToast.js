export function toast(message, cor){
    const body = document.querySelector("body")
    const containerToast =document.createElement("div");
    const textToast = document.createElement("p");
    
    containerToast.id= "toast"
    containerToast.classList.add("appear")
    containerToast.style =`background-color:${cor}`
    textToast.innerText=message
    
    containerToast.append(textToast)
    body.append(containerToast)

    setTimeout(()=>{
        containerToast.classList.remove("appear")
        containerToast.classList.add("desappear")
    }, 2700)

    setTimeout(()=>{
        body.removeChild(containerToast)
    }, 3000)
}