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
  layout.drawer.querySelector(".tool-bar--center > h2").innerText = STRING.CONTACTS;
  
  layout.on("open", function(){ app.screen = s_contacts });
  layout.on("close", function(){ app.screen = s_main });
  
  s_contacts.layout = layout;
  
  // inicializar contacts //
  let list_view = new ListView(layout.drawer.querySelector(".list-view"));
  let li_create_group = list_view.addItem(null, STRING.CREATE_GROUP+"", "users");
  let li_add_contact = list_view.addItem(null, STRING.ADD_CONTACT+"", "user-plus");
  list_view.addDivider();
  
  li_add_contact = list_view.getItem(li_add_contact);
  li_create_group = list_view.getItem(li_create_group);
  
  li_add_contact.onclick = function(){s_add_contacts.open()};
  
  s_contacts.list_view = list_view;
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
  layout.drawer.querySelector(".tool-bar--center > h2").innerText = STRING.ADD_CONTACT;
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

/**
  LOGIC CONTACTS
**/
var contacts = {
  save: function(d){
    
  },
  getAll: function(){
    
  }
}