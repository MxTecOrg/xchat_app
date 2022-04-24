function s_main () {
  let lay = dom.get("#main-layout");
  lay.style.display = "flex";
  
  new TabLayout("tabs-main");
  
  s_main.layout = lay;
}