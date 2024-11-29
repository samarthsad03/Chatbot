let prompt = document.querySelector("#prompt")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;
function createChatbox(html, className){
    let div = document.createElement("div")  //document ke andar element create kar dega 
    div.classList.add(className)  //abhi classname ke andar copy kara hai user chatbox
    div.innerHTML= html
    return div //jo neeche banaya hai  userChatbox = createchatbox udher catch kar lenge 
}

btn.addEventListener("click", () =>{
    userMessage = prompt.value
    if(!userMessage) return;
    let html= `<div class="image">
                <img src="devil.png" alt="" Width = "50">
            </div>
            <p class="text"></p>`;
    let userChatbox = createChatbox(html, "user-chatbox")
    userChatbox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatbox)
    prompt.value = ""

})