app.script( PATH.js + "/themes.js");
app.script( PATH.js + "/client/connect.js");

app.script( PATH.js + "/components/tab-layout.js");
app.script( PATH.js + "/components/list-view.js");
app.script( PATH.js + "/components/edit-text.js");
app.script( PATH.js + "/components/drawer-layout.js");

app.script( PATH.js + "/sections/s-main.js");
app.script( PATH.js + "/sections/s-chat.js");
app.script( PATH.js + "/sections/s-drawer.js");
app.script( PATH.js + "/sections/s-contacts.js");
app.script( PATH.js + "/sections/s-welcome.js");
app.script( PATH.js + "/sections/s-login.js");
if(TEST_ENABLE) app.script(PATH.js + "/debug.js");

function OnStart(){
  app.screen = s_main;
  DB = java.DB;
  DOM = document;
  
  // SQL //
  DB.createContactsTable();
  DB.createRoomTable();
  DB.createMessageTable();
  
  // load theme //
  theme();
  switch( app.load_data("theme") ) {
    case "light": theme.light(); break;
    case "dark": theme.dark(); break;
    default:
      app.save_data("theme", "light");
      theme.light();
  } //theme.light();
  
  // load app interface //
  if( app.load_data("authenticated") ) {
      app.loading.show();
      InitMainApp();
      app.loading.hidden();
  }
  else InitWelcome();
}

function InitMainApp(){
  delete window.InitMainApp;
  delete window.InitWelcome;
  delete window.s_welcome;
  delete window.s_login;
  
  s_main(); app.debug("init->main", "screen loaded"); // main screen init
  s_chat(); app.debug("init->chat", "screen loaded"); // chat screen init
  s_drawer(); app.debug("init->drawer", "screen loaded"); // drawer init
  s_contacts(); app.debug("init->contacts", "screen loaded"); // contacts screen init
  
  /* load app files */
  java.createDir(PATH.data + "/rooms");
  java.createDir(PATH.data + "/multimedia");
  
  /* socket */
  Connect();
}

function InitWelcome () {
  s_welcome(); app.debug("init->welcome", "screen loaded");
  s_login(); app.debug("init->login", "screen loaded");
}


  /*//////////////////////*/
 /*/ Device back-button /*/
/*//////////////////////*/
function OnBack(){ app.screen.close() }

  /*//////////////////////////*/
 /*/ Send app to background /*/
/*//////////////////////////*/
function OnPause(){}
function OnResume(){}