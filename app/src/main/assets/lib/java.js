/*************************
 *  Javascript Interface  *
 **************************/
var java = {};
let JSINTERFACE = window.JSInterface;

/******************
 *  Toast Builder  *
 *******************
 * param String{text}
 * return void
 ***********/
java.toast = (text, type) => {
    if (typeof(text) == "object") text = JSON.stringify(text);
    JSINTERFACE.toast(text, (type ? type : ""));
};

/******************
 *  Snack Builder  *
 *******************
 * param String{text}
 * return void
 ***********/
java.snackBar = (text, type) => {
    if (typeof(text) == "object") text = JSON.stringify(text);
    JSINTERFACE.snackBar(text, (type ? type : ""));
};

/********************
 * Check Permissions *
 *********************
 * param String{text}
 * return String
 ***********/
java.checkPerms = (perm) => {
    return JSINTERFACE.checkPerms(perm);
};

/******************
 * Ask Permissions *
 *******************
 * param String{text}
 * return void
 ***********/
java.askPerms = (perm) => {
    JSINTERFACE.askPerms(perm);
};

/******************
 *     Vibrate     *
 *******************
 * param Long{time}
 * return void
 ***********/
java.vibrate = (time) => {
    JSINTERFACE.vibrate(time);
};

/*******************
 *  List Directory  *
 ********************
 * param String{path}
 * param Callback{return {String}}
 ***********/
java.listDir = async (path, callback) => {
    let data = await JSINTERFACE.listDir(path).split(",");
    let err = false;
    if (data[0] == "__ERROR__") {
        err = data[1];
        data = null;
    }

    callback(err, data);
    return {
        err: err,
        data: data
    };
};

java.listDirSync = (path) => {
    let data = JSINTERFACE.listDir(path).split(",");
    let err = null;
    if (data[0] == "__ERROR__") {
        err = data[1];
        data = null;
    }

    return {
        err: err,
        data: data
    };
};

/******************
 *    Read File    *
 *******************
 * param String{path}
 * param Callback{string , string}
 ***********/
java.readFile = async (path, callback) => {

    let data = await JSINTERFACE.readFile(path).split("||||||||||");

    let err = false;
    if (data[0] == "ERROR") {
        err = data[1];
    }
    if (callback) callback(err, data[1]);
    return {
        err: err,
        data: data[1]
    };
};

java.readFileSync = (path) => {

    let data = JSINTERFACE.readFile(path).split("||||||||||");

    let err = false;
    if (data[0] == "ERROR") {
        err = data[1];
        return undefined;
    }

    return data[1];
};


/******************
 *    Write File   *
 *******************
 * param String{path}
 * param String {file}
 * param String {content}
 * param Callback{string}
 ***********/
java.writeFile = async (path, content, callback) => {

    let data = await JSINTERFACE.writeFile(path, content , false).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {
        err = data[1];
    }

    if (callback) callback(err);
    return err;
};

java.writeFileSync = (path, content) => {

    let data = JSINTERFACE.writeFile(path, content, false).split("||||||||||");
    let err = true;
    if (data[0] == "ERROR") {
        err = data[1];
    }
    return err;
};

/*******************
 *   Create Folder  *
 ********************
 * param String{path}
 * param Callback{Boolean}
 ***********/
java.createDir = async (path) => {

    let data = await JSINTERFACE.createDir(path).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {
        return false;
    }
    return (data[1] == "false" ? false : true);
};


/******************
 *    Is Folder    *
 *******************
 * param String{path}
 * return Boolean
 ***********/
java.isFolder = (path) => {

    let data = JSINTERFACE.isFolder(path).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {

        return false;
    }
    if (data[0] == "false") return false;
    else return true;
};

/******************
 *   File Exists   *
 *******************
 * param String{path}
 * return Boolean
 ***********/
java.fileExists = (path) => {

    let data = JSINTERFACE.fileExists(path).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {
        return false;
    }
    if (data[0] == "false") return false;
    else return true;
};

/******************
 *     is File     *
 *******************
 * param String{path}
 * return Boolean
 ***********/
java.isFile = (path) => {
    let data = JSINTERFACE.isFile(path).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {
        return false;
    }
    if (data[0] == "false") return false;
    else return true;
};

/******************
 *   Has Internet  *
 *******************
 * return Boolean
 ***********/
java.hasInternet = (path) => {
    let data = JSINTERFACE.hasInternet();
    if (data == "false") return false;
    else return true;
};

/*********************
 *   Set Debug Mode   *
 **********************/
/*

var DEBUG = {
    mode: false,
    cont: document.createElement("div")
};

java.setDebugMode = (mode) => {
    if (mode != true) return;
    const body = document.getElementsByTagName("body")[0];
    DEBUG.mode = mode;
    DEBUG.cont.style.width = "50vw";
    DEBUG.cont.style.height = "100vh";
    DEBUG.cont.style.position = "absolute";
    //DEBUG.cont.style.padding = "5% 5% 5% 5%";
    //DEBUG.cont.style.backgroundColor = "#313131";
    DEBUG.cont.style.color = "#cc2525";
    DEBUG.cont.style.zIndex = "9999999";
    DEBUG.cont.style.opacity = "0.6";
    body.appendChild(DEBUG.cont);
};

const onWebviewConsole = (mess) => {
    if (DEBUG.mode) {
        const m = document.createElement("div");
        m.innerText = mess;
        m.style.padding = "5% 5% 5% 5%";
        DEBUG.cont.appendChild(m);
    }
};

/* Log de Java */
java.log = async (tag, msg) => {
    JSINTERFACE.log(tag, msg);
};

/* app colors */
java.setAppColor = async (statusBar, navBar) => {
    try {
        JSINTERFACE.setStatusBarColor(statusBar, navBar);
    } catch (err) {

    }
}


/******************
 *     STATICS     *
 *******************/
try {
    java.STATICS = JSON.parse(JSINTERFACE.getStatics());
} catch (err) {
    java.STATICS = {};
}

/************************
 * Notification Builder *
 ************************/

java.noti = {
    /* Create Channel *
     *param String{channel}
     */
    createChannel: function(channel) {
        JSINTERFACE.createChannel(channel);
    },

    /* Create Chat Noti *
     * param String{channel}
     * param int{noti_id}
     * param String{title}
     */
    createCNoti: function(channel, noti_id, title) {
        JSINTERFACE.createCNoti(channel, noti_id, title);
    },
    /* add message *
     * param int{noti_id}
     * param String{name}
     * param String{msg}
     * param int{date}
     */
    addMess: function(noti_id, name, msg, date) {
        JSINTERFACE.addMess(noti_id, name, msg, date);
    },

    delete: function(noti_id) {
        JSINTERFACE.deleteNoti(noti_id);
    }
}


/****************
 * System Sound *
 ****************/

java.soundClick = () => {
    try {
        JSINTERFACE.sound_click();
    } catch (err) {
        alert(err);
    }
}


java.exitApp = () => {
    JSINTERFACE.exitApp();
}
/*
delete window.JSInterface;
JSINTERFACE = null;
*/

/******************
 *   SQL Database  *
 *******************/
java.DB = {};

/*********************
 * Create Room Table *
 *********************
 * crear la tabla de rooms
 * return {void}
 ********/

java.DB.createRoomTable = async () => {
    JSINTERFACE.createRoomTable();
}

/******************
 *   Create Room  *
 ******************
 * crear row en la 
 * tabla rooms
 * return {boolean}
 **********/

java.DB.updateRoom = (data) => {
    const {
        chat_id,
        pic,
        type,
        gType,
        link,
        name,
        desc,
        bgColor,
        textColor,
        owner,
        admins,
        members,
        banList,
        bots,
        pinned,
        level
    } = data;
    if (JSINTERFACE.updateRoom(chat_id, pic, type, gType,
            link, name, desc, bgColor, textColor, owner,
            JSON.stringify(admins), JSON.stringify(members), JSON.stringify(banList), JSON.stringify(bots), JSON.stringify(pinned), level) == "true") return true;
    else return false;
}

java.DB.createRoom = (data) => {
    const {
        chat_id,
        pic,
        type,
        gType,
        link,
        name,
        desc,
        bgColor,
        textColor,
        owner,
        admins,
        members,
        banList,
        bots,
        pinned,
        level
    } = data;
    if (JSINTERFACE.createRoom(chat_id, pic, type, gType,
            link, name, desc, bgColor, textColor, owner,
            JSON.stringify(admins), JSON.stringify(members), JSON.stringify(banList), JSON.stringify(bots), JSON.stringify(pinned), level) == "true") return true;
    else return false;
}

/**********************
 *  update room data  *
 **********************
 * actualizar key de una
 * room
 * return {boolean}
 ***********/

java.DB.updateRoomData = (chat_id, key, value) => {
    if (JSINTERFACE.updateRoomData(chat_id, key, value) == "true") return true;
    else return false;
}

/*****************
 *  Delete Room  *
 *****************
 * borrar room chat
 * return {int}
 ********/

java.DB.deleteRoom = (chat_id) => {
    return JSINTERFACE.deleteRoom(chat_id);
}

/************************
 * Create Message Table *
 ************************
 * crear tabla de mensaje
 * return {void}
 ***********/

java.DB.createMessageTable = async (chat_id) => {
    JSINTERFACE.createMessageTable(chat_id);
}

/*****************
 * Get All Rooms *
 *****************
 * obtener todos los
 * ids de las rooms
 * return [String]
 *********/
java.DB.getAllRooms = () => {
    const rooms = JSINTERFACE.getAllRooms();
    if (rooms == "") return false;
    return rooms.split(",");
}

/*****************
 * Get Room Data *
 *****************
 * Obtener los datos
 * de la room
 * return {object}
 ********/

java.DB.getRoomData = (chat_id) => {
    const data = JSINTERFACE.getRoomData(chat_id);
    if (data == "null") return false;
    else {
        try {
            return JSON.parse(data);
        } catch (e) {
            return false;
        }
    }
}

/**********************
 * Get All Rooms Data *
 **********************
 * obtener todos los 
 * datos de las rooms
 * return {object} 
 *********/

java.DB.getAllRoomsData = () => {
    const data = JSINTERFACE.getAllRoomsData();
    if (data == "null") return false;
    else {
        try {
            return JSON.parse(data);
        } catch (e) {
            return false;
        }
    }
}

/****************
 * Rooms Length *
 ****************
 * obtener el 
 * conteo de rooms
 * return {int}
 *******/

java.DB.roomsLength = () => {
    const data = JSINTERFACE.roomsLength();
    return parseInt(data);
}

/*****************
 *  Add Message  *
 *****************
 * añadir mensaje
 * a la tabla 
 * return {boolean}
 *********/

java.DB.addMessage = (data) => {
    const {
        mess_id,
        user_id,
        user_nick,
        user_color,
        chat_id,
        type,
        reply,
        shared,
        isEdited,
        isBot,
        receivedBy,
        seenBy,
        message,
        inline,
        keyboard,
        date

    } = data;
    const mess = JSINTERFACE.addMessage(mess_id, user_id, user_nick, user_color,
        chat_id, type, (typeOf(reply) == "object" ? JSON.stringify(reply) : reply), parseInt(shared), parseInt(isEdited), parseInt(isBot),
        JSON.stringify(receivedBy), JSON.stringify(seenBy), message, JSON.stringify(inline), JSON.stringify(keyboard), parseInt(date));
    if (mess == "true") return true;
    else return false;

}

java.DB.updateMessage = (data) => {
    const {
        mess_id,
        user_id,
        user_nick,
        user_color,
        chat_id,
        type,
        reply,
        shared,
        isEdited,
        isBot,
        receivedBy,
        seenBy,
        message,
        inline,
        keyboard,
        date

    } = data;
    const mess = JSINTERFACE.updateMessage(mess_id, user_id, user_nick, user_color,
        chat_id, type, (typeOf(reply) == "object" ? JSON.stringify(reply) : reply), parseInt(shared), parseInt(isEdited), parseInt(isBot),
        JSON.stringify(receivedBy), JSON.stringify(seenBy), message, JSON.stringify(inline), JSON.stringify(keyboard), parseInt(date));
    if (mess == "true") return true;
    else return false;

}

/***********************
 * Update Message Data *
 ***********************
 * actualizar un dato de
 * un mensaje 
 * return {boolean}
 ***********/

java.DB.updateMessageData = (chat_id, mess_id, key, value) => {
    const mess = JSINTERFACE.updateMessageData(chat_id, mess_id, key, value);
    if (mess == "true") return true;
    else return false;
}

/********************
 * Get Message Data *
 ********************
 * obtener los datos 
 * de un mensaje 
 * return {object}
 **********/

java.DB.getMessageData = (chat_id, mess_id) => {
    const mess = JSINTERFACE.getMessageData(chat_id, mess_id);
    if (mess == "false") return false;
    else {
        try {
            return JSON.parse(mess);
        } catch (err) {
            return false;
        }
    }
}

/*******************
 * Get Chat Length *
 *******************
 * devuelve la cantidad
 * de sms de una room
 * return {int}
 **********/

java.DB.getChatLength = (chat_id) => {
    return parseInt(JSInterface.getChatLength());
}

/****************************
 * Get All Messages In room *
 ****************************
 * Obtener todos los mensajes
 * de una room con rango
 * return {object}
 ***********/

java.DB.getAllMessInRoom = (chat_id , start , end) => {
    const mess = JSINTERFACE(chat_id , (start ? start : "null") , (end ? end : "null"));
    if(mess == "null") return false;
    else {
        try{
            return JSON.parse(mess);
        }catch(err){
            return false;
        }
    }
}

/*******************
 * Delete Messages *
 *******************
 * Borra toda una 
 * tabla de mensajes
 * return {void}
 **********/

java.DB.deleteMessages = async (chat_id) => {
    JSINTERFACE.deleteMessages(chat_id);
}

/*********************
 * Get Room Messages *
 *********************
 * retorna todos los 
 * ids de sms de una room
 * return [string]
 **********/
 
 java.DB.getRoomMessages = (chat_id) => {
    let mess = JSINTERFACE.getRoomMessages(chat_id);
    if(mess == "null") return false;
    else return mess.split(",");
 }
