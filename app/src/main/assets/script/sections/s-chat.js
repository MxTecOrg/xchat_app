/**
  CHAT SCREEN
**/

function s_chat () {
  let layout = Drawer.UI("chat-screen", {
    draggable: true,
    position: "bottom",
    duration: 400,
    animation: "smooth",
    exitDuration: 200,
    size: app.height,
    css_size: "100vh",
    opacity: 0,
  });

  let layer_container = DOM.getElementById("chat-layercontainer");
  let textToolBar = DOM.querySelector("#chat-screen .tool-bar--center strong");
  let input = layout.drawer.querySelector(".action-bar--input");
  
  let room = null;
  let last_room = null;
  
  layout.on("open", function(){ app.screen = s_chat });
  layout.on("close", function(){ app.screen = s_main });
  s_chat.layout = layout;
  DOM.styleSheets[0].addRule(".action-bar--input:empty:before", "content:\"" + STRING.CHAT_INPUT + "\"");
  
  /* CREATE CHATS */
  s_chat.setChat = function(_room){
    if(room) room.input_value = input.textContent;
    last_room = room;
    room = _room;
    if(!room.layout) {
      room.layout = DOM.createElement("div");
      for (let sms of room.messages) room.layout.appendChild(createSMS(sms.message, sms.isuser));
      layer_container.appendChild(room.layout);
    }
    if(last_room) last_room.layout.style.display = "none";
    room.layout.style.display = "flex";
    textToolBar.innerText = room.name;
    input.innerText = room.input_value?room.input_value:"";
  };
  
  function createSMS (txt, is_yoursms) {
    let layer = DOM.createElement("div");
    let sms = DOM.createElement("div");
    
    layer.setAttribute("class", "sms-layer " + (is_yoursms?"m":"o") + "sms-layer");
    sms.setAttribute("class", "sms");
    sms.innerText = txt;
    layer.appendChild(sms);
    return layer;
  }
}

s_chat.open = function(){ s_chat.layout.open() };
s_chat.close = function(){ s_chat.layout.close() };