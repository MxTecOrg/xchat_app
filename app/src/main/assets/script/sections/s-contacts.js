function s_contacts () {
  let layout = Drawer.UI("contacts-layout", {
    draggable: false,
    position: "right",
    animation: "bounce",
    duration: 700,
    exitDuration: 200,
    size: screen.width,
    opacity: 0.3,
  });
  
  s_contacts.layout = layout;
}

s_contacts.open = function(){ 
  s_contacts.layout.open(); 
  app.screen = s_contacts;
};
s_contacts.close = function(){ 
  s_contacts.layout.close();
  app.screen = s_main;
};
