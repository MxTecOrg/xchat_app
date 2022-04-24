function s_drawer () {
   // drawer init //
  btn_open_drawer = dom.get("#btn-open-drawer");
  btn_open_drawer.onclick = function(e){ s_drawer.open() };
      
  s_drawer.layout = Drawer.UI("app-drawer", {
    draggable: true,
    animation: "smooth",
    duration: 500
  });
}

s_drawer.open = function(){ s_drawer.layout.open() }
s_drawer.close = function(){ s_drawer.layout.close() }