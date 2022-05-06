app.PACKAGE_NAME = java.STATICS.appPackage;
app.APP_NAME = java.STATICS.appName;

/* test */
TEST_ENABLE = 1;

/* directory paths */
PATH = {
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
  user: null,
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