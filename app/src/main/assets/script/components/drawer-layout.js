/*
 * DRAWER LAYOUT
*/


Drawer.UI = function(id, opt){
  opt.background = "var(--app-accent-color)";
  let drawer = new Drawer(id, opt);
  let lay = drawer.drawer;
  drawer.shadow.setAttribute("class", "layout");
  lay.setAttribute("class", "layout");
  lay.style.display = "flex";
  lay.style.flexDirection = "column";
  
  return drawer;
};