app.PACKAGE_NAME = java.STATICS.appPackage;
app.APP_NAME = java.STATICS.appName;
app.LANG = java.STATICS.lang || "es";

/* test */
TEST_ENABLE = 1;

/* directory paths */
PATH = {
  this: location.href.replace("/xchat.html", "").replace("file:///sdcard", "/storage/emulated/0"),
  img: "./src",
  snd: "./src",
  js:  "./script",
  css: "./styles",
  lib: "./lib",
  
  data: java.STATICS.dataStorage.replace(/\/files$/, ""),
  app: java.STATICS.appStorage,
  internal: java.STATICS.internalStorage
};

/* user token */
TOKEN = app.load_data("token");

/* user data */
USER = app.load_data("user-data", {
  name: null,
  pass: null,
  email: null
});

/* direcciones externas */
URL = {
  host: java.STATICS.host,
  socket: java.STATICS.host + java.STATICS.socket,
  login: java.STATICS.host + java.STATICS.login,
  register: java.STATICS.host + java.STATICS.register,
  resendToken: java.STATICS.host + java.STATICS.resendToken,
  verify: java.STATICS.host + java.STATICS.verify,
};

/* strings */
app.script(PATH.this + "/string/" + app.LANG + "/" + app.LANG + ".js", function(){STRING = json});
app.script(PATH.this + "/string/" + app.LANG + "/raw-" + app.LANG + ".js", function(){RAW = json; delete window.json});