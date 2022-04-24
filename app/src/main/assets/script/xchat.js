app.script( PATH.js + "/themes.js");

app.script( PATH.js + "/components/tab-layout.js");
app.script( PATH.js + "/components/drawer-layout.js");

app.script( PATH.js + "/sections/s-main.js");
app.script( PATH.js + "/sections/s-drawer.js");
app.script( PATH.js + "/sections/s-contacts.js");
app.script( PATH.js + "/sections/s-welcome.js");
app.script( PATH.js + "/sections/s-login.js");

function OnStart(){
  java.setDebugMode(false);
  
  // load theme //
  theme();
  switch( app.load_data("theme") ) {
    case "light": theme.light(); break;
    case "dark": theme.dark(); break;
    default:
      app.save_data("theme", "light");
      theme.light();
  }
  
  // load app interface //
  if( app.load_data("authenticated") ) {
      app.loading.show();
      InitMainApp();
      connect();
  }
  else {
    s_welcome();
    s_login();
  }
}

function InitMainApp(){
  s_welcome = null; s_login = null;
    
  s_main(); // main layout init //
  s_drawer(); // drawer init //
  s_contacts(); // contacts layout init //
}