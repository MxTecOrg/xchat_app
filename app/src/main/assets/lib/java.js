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


/******************
 *    Write File   *
 *******************
 * param String{path}
 * param String {file}
 * param String {content}
 * param Callback{string}
 ***********/
java.writeFile = async (path, content, callback) => {

    let data = await JSINTERFACE.writeFile(path, content).split("||||||||||");
    let err = false;
    if (data[0] == "ERROR") {
        err = data[1];
    }

    if (callback) callback(err);
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

delete window.JSInterface;
JSINTERFACE = null;