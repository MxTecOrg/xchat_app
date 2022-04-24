PATH = {
  img: "./src",
  snd: "./src",
  js:  "./script",
  css: "./styles"
};

USER = app.load_data("user-data", {
  user: null,
  pass: null,
  email: null
});

URL = {};
URL.server ="https://mxtec-org-xchat.glitch.me";
URL.auth = URL.server + "/auth";
/*
  /auth/register
  /auth/login
  /auth/verify
  /auth/resendToken
*/