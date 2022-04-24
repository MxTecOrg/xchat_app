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
    "--app-accent-font-color: #000000;" +
    "--app-primary-color: #1d6071;" +
    "--app-primary-font-color: #ffffff;" +
    "--app-primary-dark-color: #00aa00;" +
    "--app-control-color: #0000ff;" +
    "--app-control-lightcolor: #aaaaff;"
  );
  java.setAppColor("#1d6071", "#1d6071");
}

// dark //
theme.dark = function(){
  theme.is = "dark";
  theme.root(
    "--app-accent-color: #272727;" +
    "--app-accent-font-color: #eeeeee;" +
    "--app-primary-color: #565656;" +
    "--app-primary-font-color: #ffffff;" +
    "--app-primary-dark-color: #00aa00;" +
    "--app-control-color: #ffffff;" +
    "--app-control-lightcolor: #999999;"
  );
  java.setAppColor("#565656", "#565656");
};
