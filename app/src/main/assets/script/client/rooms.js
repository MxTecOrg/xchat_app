/**
  ROOMS
**/
ROOMS = {};

/** LOAD ROOMS FROM DB **/
async function LoadRooms () {
  var rooms = java.listDirSync(PATH.data + "/rooms").data;
  /** test /
  CreateRoomUI({
    name: "El Cabra",
    messages: [
      {message: "mensalals skdjj skfkfk skdkfkkg skdkfkgkgk sdkfkkgje de prueba", isuser: true},
      {message: "otro mas", isuser: false},
    ]
  });
  CreateRoomUI({
    name: "Fulanito",
    messages: []
  });
  / test **/
  if(rooms[0]) for(var room of rooms) {
    try {
      var f = JSON.parse( 
        java.readFileSync(PATH.data + "/rooms" + "/" + room) 
      );
      ROOMS[f.chat_id] = f;
      CreateRoomUI(f);
      java.log("room->read", "Room " + f.chat_id + " leida correctamente.");
      app.debug("room->loaded", f.chat_id);
    }
    catch(e){
      app.debug("room->read", e);
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
  if(smss.length) last_sms.innerText = smss[smss.length - 1].message;
  
  layer.onclick = function(e){
    s_chat.setChat(room);
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

function SOCKET__NewPv (data) {
  if(!data.messages) data.messages = [];
  s_chat.setChat(data);
  OnBack();
  s_chat.open();
  app.loading.hidden();
}