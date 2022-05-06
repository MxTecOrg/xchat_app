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
  lay.style.overflowX = "hidden";
  lay.style.flexDirection = "column";
  
  if(!opt.position || opt.position == "left" || opt.position == "right") {
    lay.style.height = "100vh";
    if(typeof opt.css_size == "string") lay.style.width = opt.css_size;
  }
  else if(opt.position == "bottom" || opt.position == "top") {
    lay.style.width = "100vw";
    if(typeof opt.css_size == "string") lay.style.height = opt.css_size;
  }
  
  return drawer;
};