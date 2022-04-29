app.script( PATH.js + "/client/user-data.js");
app.script( PATH.js + "/client/rooms.js");
app.script( PATH.js + "/client/messages.js");

SOCKET = null;

function Connect () {
  /* title tool-bar animation */
  let txt_main = s_main.toolbar.querySelector(".tool-bar--center > h2");
  let txt_main_interval = null;
  let txt_main_loading = function(txt){
    txt_main.innerText = txt;
    let pts = "";
    txt_main_interval = window.setInterval(function(){
      if(pts.length > 3) pts = "";
      txt_main.innerText = txt + pts;
      pts += ".";
    }, 200);
  };
  
  /** connection **/
  txt_main_loading("Conectando");
  SOCKET = io.connect(URL.socket, {
    query: "token=" + TOKEN,
    cors: { origin: null }
  });
  SOCKET.on("connect", function(){
    java.toast("Conectado...");
    window.clearInterval(txt_main_interval);
    txt_main.innerText = app.APP_NAME;
  });
  SOCKET.on("reconnect", function(){
    java.toast("Reconectando...");
  });
  SOCKET.on("disconnect", function(){
    java.toast("Desconectado...");
    txt_main_loading("Conectando");
  });
  
  /** listeners **/
  SOCKET.on("alert", s => app.debug(s));
  SOCKET.on("load-user", SOCKET__LoadUser);
  SOCKET.on("get-room-data", SOCKET__GetRoomData);
  SOCKET.on("get-room-mess", SOCKET__GetRoomMessage);
  
  /* cargar chats de la DB */
  LoadRooms();
}