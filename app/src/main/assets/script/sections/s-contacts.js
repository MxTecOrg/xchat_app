function s_contacts () {
  let layout = Drawer.UI("contacts-layout", {
    draggable: false,
    position: "right",
    animation: "bounce",
    duration: 700,
    exitDuration: 200,
    size: screen.width,
    opacity: 0,
  });
  
  layout.on("open", function(){ app.screen = s_contacts });
  layout.on("close", function(){ app.screen = s_main });
  
  new ListView(layout.drawer.querySelector(".list-view"));
  s_contacts.layout = layout;
}

s_contacts.open = function(){ s_contacts.layout.open() };
s_contacts.close = function(){ s_contacts.layout.close() };
