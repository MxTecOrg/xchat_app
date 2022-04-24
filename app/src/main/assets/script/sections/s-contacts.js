function s_contacts () {
  s_contacts.layout = Drawer.UI("contacts-layout", {
    draggable: false,
    position: "right",
    animation: "bounce",
    duration: 700,
    exitDuration: 200,
    size: screen.width,
    opacity: 0.3,
  });
}

s_contacts.open = function(){ s_contacts.layout.open() };
s_contacts.close = function(){ s_contacts.layout.close() };
