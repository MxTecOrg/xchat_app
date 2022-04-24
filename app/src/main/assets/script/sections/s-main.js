function s_main () {
  let lay = dom.get("#main-layout");
  lay.style.display = "flex";
  
  new TabLayout("tabs-main");
  
  s_main.layout = lay;
}

s_main.open = function(){};
s_main.close = function(){
  app.confirm("¿Seguro que desea salir?", function(b){
    if(b) java.exit();
  });
};