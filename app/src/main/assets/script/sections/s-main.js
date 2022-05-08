function s_main () {
  let lay = dom.get("#main-screen");
  let tabs = new TabLayout(document.getElementById("tabs-main"));
  let toolbar = lay.querySelector(".tool-bar");
  
  lay.style.display = "flex";
  
  //* layers tab *//
  chat_layout = tabs.getLayer(0);
  canals_layout = tabs.getLayer(1);
  bots_layout = tabs.getLayer(2);
  
  //* tabs *//
  tabs.getTab(0).innerText = STRING.CHATS.toUpperCase();
  tabs.getTab(1).innerText = STRING.STATES.toUpperCase();
  tabs.getTab(2).innerText = STRING.BOTS.toUpperCase();
  
  s_main.closeTime = 0;
  s_main.layout = lay;
  s_main.tabs = tabs;
  s_main.toolbar = toolbar;
}

s_main.open = function(){};
s_main.close = function(){
  if(Date.now() - s_main.closeTime < 800) java.exitApp();
  else {
    java.toast(STRING.QUIT);
    s_main.tabs.open(0);
  }
  s_main.closeTime = Date.now();
};