/**
  CHAT SCREEN
**/

function s_chat () {
  let layout = Drawer.UI("chat-screen", {
    draggable: false,
    position: "bottom",
    duration: 400,
    animation: "smooth",
    exitDuration: 200,
    size: app.height,
    opacity: 0,
  });
  let layer_container = document.getElementById("chat-layercontainer");
  let textToolBar = document.querySelector("#chat-screen .tool-bar--center strong");
  layout.on("open", function(){ app.screen = s_chat });
  layout.on("close", function(){ app.screen = s_main });
  s_chat.layout = layout;
  
  /* CREATE CHATS */
  let last_room = null;
  s_chat.setChat = function(name, smss){
    //let layer = document.createElement("div");
    textToolBar.innerText = name;
  };
  
  s_chat.showChat = function(name) {
    
  };
}

s_chat.open = function(){ s_chat.layout.open() };
s_chat.close = function(){ s_chat.layout.close() };