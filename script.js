let prompt = document.querySelector("#prompt")
let container=document.querySelector(".container")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;

//let API_URL = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB6IwHM8g8ReTeX7SZUAd75CzXp3tP-lG4
let API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyB6IwHM8g8ReTeX7SZUAd75CzXp3tP-lG4";

function createChatbox(html, className){
    const div = document.createElement("div")  //document ke andar element create kar dega 
    div.classList.add(className)  //abhi classname ke andar copy kara hai user chatbox
    div.innerHTML= html
    return div //jo neeche banaya hai  userChatbox = createchatbox udher catch kar lenge 
}
async function getApiResponse (aiChatbox) {
const textElement = aiChatbox.querySelector(".text")
    try{
        let response=await fetch(API_URL,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "contents":[
                {
                    "role": "user",

                "parts":[
                    {text:"You are a helpful chatbot, reply to the follwing text as a highschool boy who is the volleyball team captain in Japan."},

                    {text:aiChatbox.textContent,}]}]
         })
    })
    let data = await response.json();
    console.log(data)
    let apiresponse = data?.candidates[0].content.parts[0].text;
    console.log(apiresponse)
    }
    catch(error){   //idher exceptioa aynge 
        console.log(error)
    }
    finally{
        aiChatbox.querySelector(".loading").style.display="none"
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

btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(prompt.value=""){
      container.style.display="flex"
    }else{
       container.style.display="none"
    }
    if(!userMessage)return;
  const html=` <div id="img">
        <img src="devil.png" alt="">
    </div>
    <div class="text">
    </div>`
 let userChatBox=createChatbox(html,"user-chat-box")
 userChatBox.querySelector(".text").innerText=userMessage
 chatContainer.appendChild(userChatBox)
 prompt.value=""
 setTimeout(showLoading,500)

})