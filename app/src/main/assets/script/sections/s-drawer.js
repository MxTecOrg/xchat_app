function s_drawer () {
  // drawer init //
  let layout = Drawer.UI("app-drawer", {
    draggable: true,
    animation: "smooth",
    duration: 500
  });
  layout.on("open", function(){ app.screen = s_drawer });
  layout.on("close", function(){ app.screen = s_main });
  
  s_drawer.layout = layout;
}

s_drawer.open = function(){ s_drawer.layout.open() };
s_drawer.close = function(){ s_drawer.layout.close() };