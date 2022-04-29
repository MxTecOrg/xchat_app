/**
  ROOMS
**/
ROOMS = {};

var LoadRooms = async function () {
  var rooms = java.listDirSync(PATH.data + "/Rooms").data;
  /** test **/
  CreateRoomUI({
    name: "El Cabra",
    messages: ["mensaje de prueba"]
  });
  CreateRoomUI({
    name: "Fulanito",
    messages: ["hello world"]
  });
  /** test **/
  if(rooms[0]) for(var room of rooms) {
    try {
      var f = JSON.parse( 
        java.readFileSync(PATH.data + "/Rooms" + "/" + room) 
      );
      ROOMS[f.chat_id] = f;
      CreateRoomUI(f);
      java.log("Read Room", "Room " + f.chat_id + " leida correctamente.");
    }
    catch(e){
      app.debug("Read Room", ""+e);
    }
  }
};

function CreateRoomUI (room) {
  let smss = room.messages;
  let layer = document.createElement("li");
  let icon_layer = document.createElement("span");
  let txt_layer = document.createElement("div");
  let title = document.createElement("strong");
  let last_sms = document.createElement("div");
  
  layer.setAttribute("class", "list-view--l");
  last_sms.setAttribute("class", "text-overflow");
  
  title.innerText = room.name;
  if(smss.length) last_sms.innerText = smss[smss.length - 1];
  
  layer.onclick = function(e){
    s_chat.setChat(room.name);
    s_chat.open();
  };
  
  txt_layer.appendChild(title);
  txt_layer.appendChild(last_sms);
  layer.appendChild(icon_layer);
  layer.appendChild(txt_layer);
  chat_layout.appendChild(layer);
}

function SOCKET__GetRoomData (data) {
  
}