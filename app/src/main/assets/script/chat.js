/* jshint esversion: 8 */
/* Esto despues lo pones a tu forma */
var SOCKET = null;

var USER = app.load_data("user");
var lastMess = (app.load_data("lastMess") ? app.load_data("lastMess") : {});
const istorage = java.STATICS.dataStorage;
java.log("storage", istorage);
if (!java.fileExists(istorage + "/rooms")) {
    java.log("File exists", "exists");
    java.createDir(istorage + "/rooms");
    java.createDir(istorage + "/multimedia");
} else java.log("File exists", "no-exists");

//if(USER) // CARGAR LA UI DEL USER

var ROOMS = {};

//Llamar esta funcion cuando cargue el body
var loadRoomsFromDB = async () => {
    const _rooms = await java.listDir(istorage + "/rooms").data;
    for (let room of _rooms) {
        try {
            const f = JSON.parse(await java.readFile(istorage + "/rooms/" + room).data);
            ROOMS[f.chat_id] = f;
            java.log("Read Room", "Room " + f.chat_id + " leida correctamente.");
        }catch(err) {
            java.log("Read Room", ""+err);
        }
    }

    for (let room in ROOMS) {
        //crear la UI de las rooms que ya existan en la db
        createRoomUI(ROOMS[room]);
        // se profundiza en los ROOMS[room].messages
        // para crear la UI de sms de esa room
        for (let msg in ROOMS[room].messages) {}
    }
};
var connect = async function () {
    java.log("Socket",
        "Intentando conectar...");
    SOCKET = await io.connect(java.STATICS.host + java.STATICS.socket,
        {
            query: "token=" + app.load_data("token"),
            cors: {
                origin: null
            }
        });

    SOCKET.on("connect",
        async (data) => {
            java.log("Socket", "Conectado");
            app.loading.hidden();
        });

    SOCKET.on("disconnect",
        async (data) => {
            java.log("Socket", "Desconectado");
        });

    SOCKET.on("reconnect",
        async (data) => {
            java.log("Socket", "Reconectando");
        });

    SOCKET.on("load-user",
        async (data) => {
            app.save_data("user", data);
            USER = data;
            java.log("USER", JSON.stringify(data));
            // Actualizar la UI del user
            for (let room of USER.rooms) {
                java.log("Socket", "emit to " + room);
                await SOCKET.emit("get-room-data", {
                    room: room
                });
            }
        });

    SOCKET.on("get-room-data",
        async(data)=> {
            java.log("Socket", "On get-room-data : " + JSON.stringify(data));
            if (ROOMS[data.chat_id]) {
                const mess = ROOMS[data.chat_id].messages;
                ROOMS[data.chat_id] = data;
                ROOMS[data.chat_id].messages = mess;
                /*Aqui en vez de crear el chat lo actualizamos */

            } else {
                /* aqui creamos el chat de 0 */
                ROOMS[data.chat_id] = data;
                /* crear el object para guardar los sms ya q lo elimino en el server al pedir los datos de la room*/
                ROOMS[data.chat_id].messages = {};
                /* crear el chat en la UI */
                await createRoomUI(ROOMS[data.chat_id]);
            }
            /* guardamos los datos recibidos en la db */
            await java.writeFile(istorage + "/rooms/" + data.chat_id + ".db" , JSON.stringify(ROOMS[data.chat_id]));
            SOCKET.emit("get-room-mess", ROOMS[data.chat_id], lastMess[data.chat_id]);
        }
    );

    SOCKET.on("get-room-mess",
        async (data) => {
            if (ROOMS[data.chat_id]) {
                for (let mess in data.data) {
                    ROOMS[data.chat_id].messages[mess] = await data.data[mess];
                    // Insertar la burbuja en el chat
                    java.log(data.data[mess]);
                }
            }
            // Guardar la room en la db
            await java.writeFile(istorage + "/rooms/" + data.chat_id + ".db" , JSON.stringify(ROOMS[data.chat_id]));
        }
    );
};

const createRoomUI = async (data) => {
    const cont = document.getElementById("chat-layout");
    const r = document.createElement("div");
    r.setAttribute("class",
        "chat-room-cont");
    r.setAttribute("id",
        data.chat_id);

    const img_c = document.createElement("div");
    img_c.setAttribute("class",
        "room-img-cont");
    img_c.style.marginLeft = "2vh";
    r.appendChild(img_c);

    const img = document.createElement("img");
    img.setAttribute("class",
        "circle-img");
    img.setAttribute("src",
        "");
    img_c.appendChild(img);

    const mid_cont = document.createElement("div");
    mid_cont.setAttribute("class",
        "room-mid-cont");
    r.appendChild(mid_cont);

    const name = document.createElement("h2");
    name.innerText = data.name;
    mid_cont.appendChild(name);

    const lastSms = document.createElement("h5");
    const k = Object.keys(data.messages).length - 1;
    lastSms.innerText = (data.messages[k] ? data.messages[k]: "...");
    lastSms.style.marginTop = "1vh";
    mid_cont.appendChild(lastSms);

    cont.appendChild(r);
};