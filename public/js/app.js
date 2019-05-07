const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")


weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent = "loading..."
    messageTwo = ""
    fetch("http://localhost:3000/weather?address="+location.toString()).then((responce=>{
        responce.json().then((data)=>{
            if(data.error)
            {
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    }))
})