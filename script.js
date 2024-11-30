let prompt = document.querySelector("#prompt")
let container=document.querySelector(".container")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;

let API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB6IwHM8g8ReTeX7SZUAd75CzXp3tP-lG4'


function createChatbox(html, className){
    let div = document.createElement("div")  //document ke andar element create kar dega 
    div.classList.add(className)  //abhi classname ke andar copy kara hai user chatbox
    div.innerHTML= html
    return div //jo neeche banaya hai  userChatbox = createchatbox udher catch kar lenge 
}
async function getApiResponse (aiChatbox) {
    try{
        let response=await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "contents":[
                {"role": "user",
                "parts":[{"text":"userMessage"}]}]
         })
    })
    let data = (await response).json();
    let apiresponse = data?.candidates[0].content.parts[0].text;
    }
    catch(error){   //idher exceptioa aynge 
        console.log(error)
    }
}

function showLoading(){
     let html = `<div class="image">
                <img src="chatbot.png" alt="" width="50">
            </div>
            <p class="text">
            </p>
            <img class="loading" src="loading.gif" alt="loading" height="50">`
            let aiChatbox = createChatbox(html, "ai-chatbox") //calling the function
            chatContainer.appendChild(aiChatbox) //jo element bana hai usse append kar dega jo container bana hai
            getApiResponse(aiChatbox) //function call 

}

btn.addEventListener("click", () =>{
    userMessage = prompt.value
    if(!userMessage) return;
    let html = `<div class="image">
                <img src="devil.png" alt="" Width = "50">
            </div>
            <p class="text"></p>`;
    let userChatbox = createChatbox(html, "user-chatbox") //calling the function
    userChatbox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatbox)
    prompt.value = ""
    setTimeout(showLoading, 500) //500 millisecond tak chalega 
    // call kar rhe hai idher 

})