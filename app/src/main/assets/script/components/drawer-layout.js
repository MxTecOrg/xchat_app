/*
 * DRAWER LAYOUT
*/


Drawer.UI = function(id, opt){
  opt.background = "var(--app-accent-color)";
  let drawer = new Drawer(id, opt);
  drawer.drawer.setAttribute("class", "layout");
  drawer.shadow.setAttribute("class", "layout");
  
  return drawer;
};