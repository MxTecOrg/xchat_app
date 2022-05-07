app = {};

// screen //
app.width = window.innerWidth;
app.height = window.innerHeight;
app.reload = function(){window.location.reload()};

// import //
app.script = function( url, callback ) {
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", url);
  script.onload = callback;
  
  if(!document.head) document.head = document.getElementsByTagName("head")[0];
  document.head.appendChild(script);
  script = null;
};

// debug //
app.debug = function(title, txt){
  if(txt) title += "  ➤";
  else { txt = title; title = "" }
  java.log(title, txt);
  console.log(title, txt);
  return txt;
};

// loading screen //
app.loading = {
  init: function(){
    let lay = document.createElement("div");
        lay.setAttribute("class", "app-loading");
        document.body.appendChild( lay );
        
    let icon = document.createElement("i");
        icon.setAttribute("class", "app-loading--icon fa fa-spinner fa-spin fa-3x");
        lay.appendChild( icon );
    
    let txt = document.createElement("p");
        txt.setAttribute("class", "app-loading--txt");
        lay.appendChild( txt );
        
    this.layout = lay;
    this.content = txt;
  },
  
  show: function(s = "") {
    let lay = this.layout;
    
    this.content.innerText = s;
    lay.style.filter = "opacity(0)";
    lay.style.display = "flex";
    dom.animate(function(porc){
      lay.style.filter = "opacity(" + porc + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * porc ) + ")";
    }, 500).start();
  },
  
  hidden: function(){
    let lay = this.layout;
    dom.animate(function(porc){
      lay.style.filter = "opacity(" + (1 - porc) + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * (1 - porc) ) + ")";
    }, 200)
      .finish( function(){ lay.style.display = "none" } )
      .start();
  }
};


// enable/disable user interaction //
app.wall = {
  init: function(){
    let lay = dom.create("div");
    lay.dom.style({
      zIndex: "9999 !important",
      position: "fixed",
      display: "none",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0)"
    });
    dom.add(lay);
    this.layout = lay;
  },
  show: function(){ this.layout.style.display = "block" },
  hidden: function(){ this.layout.style.display = "none" }
};


// database //
app.save_data = function(place, data) {
  localStorage.setItem(place, JSON.stringify({d: data}));
  return data;
};
app.load_data = function (place, def) {
  let data = localStorage.getItem(place);
  if(data) return JSON.parse(data).d;
  else return def;
};
app.clear_data = function () {localStorage.clear()};
app.remove_data = function (place) {localStorage.removeItem(place)};

// database json //
app.save_json = function(place, data, file = "app"){
  java.createDir( PATH.data + "/" + file);
  return java.writeFileSync( PATH.data + "/" + file + "/" + place, JSON.stringify(data));
};
app.load_json = function(place, def, file = "app"){
  let data = java.readFileSync( PATH.data + "/" + file + "/" + place );
  if(data) return JSON.parse(data);
  else return def;
};

// audio //
app.playSound = function (src) {
  new Audio(src).play();
};


// alert //
app.alert = function (txt, callback) {
  alert(txt);
  if(callback) callback();
};

// app init //
app.start = function(){
  document.head = document.getElementsByTagName("head")[0];
  document.body = document.getElementsByTagName("body")[0];
  app.loading.init();
  app.wall.init();
  app.isStart = true;
  if(window.OnStart) OnStart();
};