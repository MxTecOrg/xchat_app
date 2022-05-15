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
  
  s_contacts.list = list_view;
  s_add_contacts();
  contacts();
}

s_contacts.open = function(){ s_contacts.layout.open() };
s_contacts.close = function(){ s_contacts.layout.close() };
s_contacts.addContact = function(contact){
  let picture = DOM.createElement("div");
  picture.setAttribute("style", 
    "width: 100%;" +
    "height: 100%;"+
    "border-radius: 100px;"+
    "background: " + contact.color
  );
  let item = s_contacts.list.addItem(String(contact.c_nick), contact.email, picture);
  item = s_contacts.list.getItem(item);
  item.dataset.userId = String(contact.user_id);
  item.dataset.email = contact.email;
  item.dataset.nick = contact.nick;
  item.onclick = s_contacts.onclick;
};
s_contacts.onclick = function(event){
  let item = event.currentTarget;
  app.loading.show();
  SOCKET.emit("start-pv", {user_id: Number(item.dataset.userId)});
};

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
  let input = new EditTextUI( DOM.getElementById("add-contacts--input"));
  let send = layout.drawer.querySelector("i.fa-check");
  layout.drawer.style.alignItems = "center";
  input.placeholder = STRING.ADD_CONTACT_INPUT;
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
    SOCKET.emit("add-contact", txt);
  }
};

/**
  LOGIC CONTACTS
**/
contacts = function () {
  contacts = DB.getAllContactsData();
  for(let i in contacts){
    let contact = contacts[i];
    app.debug("load-contacts", contact);
    s_contacts.addContact(contact);
  }
};