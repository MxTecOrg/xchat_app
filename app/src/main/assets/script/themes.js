// init theme //
function theme () {
  const root = document.querySelector("html");
  theme.root = function(style) { root.setAttribute("style", style) };
}

// light //
theme.light = function(){
  theme.is = "light";
  theme.root(
    "--app-accent-color: #ffffff;" +
    "--app-accent-lightcolor: #dddddd;" +
    "--app-accent-font-color: #000000;" +
    
    "--app-primary-color: #1d6071;" +
    "--app-primary-lightcolor: #2e7182;" +
    "--app-primary-font-color: #ffffff;" +
    "--app-primary-font-lightcolor: #aaaaaa;" +
    
    "--app-control-color: var(--app-primary-color);" +
    "--app-control-lightcolor: var(--app-primary-lightcolor);" +
    
    "--chat-wallpaper: url('"+ PATH.img +"/light-wallpaper.png');"
  );
  java.setAppColor("#1d6071", "#1d6071");
};

// dark //
theme.dark = function(){
  theme.is = "dark";
  theme.root(
    "--app-accent-color: #272727;" +
    "--app-accent-lightcolor: #444444;" +
    "--app-accent-font-color: #eeeeee;" +
    
    "--app-primary-color: #353535;" +
    "--app-primary-lightcolor: #444444;" +
    "--app-primary-font-color: #ffffff;" +
    "--app-primary-font-lightcolor: #aaaaaa;" +
    
    "--app-control-color: var(--app-primary-font-color);" +
    "--app-control-lightcolor: var(--app-primary-font-lightcolor);"+
    
    "--chat-wallpaper: url('"+ PATH.img +"/dark-wallpaper.png');"
  );
  java.setAppColor("#353535", "#272727");
};
