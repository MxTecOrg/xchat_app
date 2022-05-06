/**
  CONTACTS SCREEN
**/

function s_contacts () {
  let layout = Drawer.UI("contacts-screen", {
    draggable: false,
    position: "right",
    animation: "bounce",
    duration: 700,
    exitDuration: 200,
    size: app.width,
    css_size: "100vw",
    opacity: 0,
  });
  
  layout.on("open", function(){ app.screen = s_contacts });
  layout.on("close", function(){ app.screen = s_main });
  
  s_contacts.layout = layout;
  
  // inicializar contacts //
  new ListView(layout.drawer.querySelector(".list-view"));
  s_add_contacts();
}

s_contacts.open = function(){ s_contacts.layout.open() };
s_contacts.close = function(){ s_contacts.layout.close() };


/**
  ADD CONTACTS SCREEN
**/
function s_add_contacts () {
  let layout = Drawer.UI("add-contacts-screen", {
    draggable: false,
    position: "right",
    animation: "smooth",
    duration: 200,
    exitDuration: 200,
    size: app.width,
    css_size: "100vw",
    opacity: 0,
  });
  let input = new EditTextUI( document.getElementById("add-contacts--input"));
  let send = layout.drawer.querySelector("i.fa-check");
  layout.drawer.style.alignItems = "center";
  input.placeholder = "Id/Email";
  input.layout.style.width = "50%";
  
  layout.on("open", function(){ app.screen = s_add_contacts });
  layout.on("close", function(){ app.screen = s_contacts });
  
  s_add_contacts.btn_send = send;
  s_add_contacts.input = input;
  s_add_contacts.layout = layout;
}

s_add_contacts.open = function(){ s_add_contacts.layout.open() };
s_add_contacts.close = function(){ s_add_contacts.layout.close() };
s_add_contacts.add = function(txt){
  if(!txt) {
    txt = s_add_contacts.input.input.value;
  }
};