app.script( PATH.js + "/client/alert.js");
app.script( PATH.js + "/client/user-data.js");
app.script( PATH.js + "/client/rooms.js");
app.script( PATH.js + "/client/messages.js");
app.script( PATH.js + "/client/contacts.js");

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
  txt_main_loading(STRING.CONNECTING);
  SOCKET = io.connect(URL.socket, {
    query: "token=" + TOKEN,
    cors: { origin: null }
  });
  SOCKET.on("connect", function(){
    app.debug("ws->connect", "CONNECT");
    window.clearInterval(txt_main_interval);
    txt_main.innerText = app.APP_NAME;
  });
  SOCKET.on("reconnect", function(){
    app.debug("ws->connect", "RECONNECT");
  });
  SOCKET.on("disconnect", function(){
    app.debug("ws->connect", "DISCONNECT");
    txt_main_loading("Conectando");
  });
  SOCKET.on("error", s => java.toast(s));
  
  /** listeners **/
  SOCKET.on("alert", SOCKET__Alert);
  SOCKET.on("toast", SOCKET__Toast);
  SOCKET.on("load-user", SOCKET__LoadUser);
  SOCKET.on("add-contact", SOCKET__AddContact);
  SOCKET.on("get-room-data", SOCKET__GetRoomData);
  SOCKET.on("new-pv", SOCKET__NewPv);
  SOCKET.on("get-room-mess", SOCKET__GetRoomMessage);
  
  /** global **/
  SOCKET.onAny((event, data) => app.debug("ws->" + event, data));
  
  /* cargar chats de la DB */
  LoadRooms();
}