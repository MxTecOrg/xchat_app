/**
  WELCOME SCREEN
**/

function s_welcome () {
  // container layout //
  let lay = dom.create("div");
  lay.id = "welcome-layout";
  dom.add(lay);

  lay = Drawer.UI("welcome-layout", {
    duration: 0,
    exitDuration: 300,
    draggable: false,
    size: screen.width,
    opacity: 1,
  });
  lay.shadow.style.backgroundColor = "var(--app-accent-color)";
  lay.drawer.style.height = "100%";
  lay.add = function(obj) {
    lay.drawer.appendChild(obj);
  };
  
  // switch dark/light theme
  let lay_toggle = dom.create("i");
  let toggle_on = theme.is == "dark";
  lay_toggle.dom.set("class", "w-toggle fa fa-" + (toggle_on?"sun":"moon") + "-o fa-lg");
  s_welcome.toggle_theme = lay_toggle;
 
  lay_toggle.onclick = function(e){
    e.stopPropagation();
    e.preventDefault();
    if(!toggle_on) {
      theme.dark();
      app.save_data("theme", "dark");
      lay_toggle.dom.set("class", "w-toggle fa fa-sun-o fa-lg");
    }
    else {
      theme.light();
      app.save_data("theme", "light");
      lay_toggle.dom.set("class", "w-toggle fa fa-moon-o fa-lg");
    }
    toggle_on = !toggle_on;
  };
  
  // top layout //
  let lay_top = dom.create("div");
  let box_lay_top = dom.create("div");
  let sections_list = [];
  let progress_list = [];
  
  box_lay_top.style.display = "flex";
  box_lay_top.style.height = "100%";
  lay_top.id = "welcome-layout--top";
  
  create_section(PATH.img + "/foto1.png", "App de mensajería");
  create_section(PATH.img + "/foto2.png", "Destinada a algo");
  create_section(PATH.img + "/foto3.png", "Blablabla superaplicación");
  create_section(PATH.img + "/foto4.png", "Disfrute");
  box_lay_top.style.width = sections_list.length * 100 + "%";
  
  // crear seccion //
  function create_section(url, txt){
    let div = dom.create("div");
    let img = dom.create("img");
    let info = dom.create("p");
    let circle = dom.create("div");
    
    circle.dom.set("class", "circle-disabled");
    div.dom.set("class", "welcome-section");
    progress_list.push(circle);
    sections_list.push(div);
    
    img.src = url;
    info.innerText = txt;
    div.dom.add([img, info]);
    box_lay_top.dom.add(div);
  }
  
  // bottom layout //
  let lay_bottom = dom.create("div");
  lay_bottom.id = "welcome-layout--bottom";
  lay_bottom.dom.add(progress_list);
  
  lay.on("open", function(){
    
    dom.animate(function(n){
      lay_bottom.style.top = 60 * ( 1 - n ) + "px";
      lay_bottom.style.filter = "opacity(" + n + ")";
    }, 700).start();
    
    dom.animate(function(n){
      lay_top.style.left = 60 * ( 1 - n ) + "px";
      lay_top.style.filter = "opacity(" + n + ")";
    }, 700).start();
  });

  // add layouts //
  lay_top.dom.add(box_lay_top);
  lay.add(lay_top);
  lay.add(lay_bottom);
  dom.add(lay_toggle);
  
  lay.open(); // show //
  
  // SCROLL EVENT //
  let in_section = 0;
  let touchStart = 0;
  let touchPos = 0;
  
  lay_top.onscroll = function(e){e.preventDefault()};
  lay_top.ontouchmove = function(e){e.preventDefault()};
  lay.drawer.ontouchstart = function(e){
    lay_top.drag = true;
    touchStart = e.changedTouches[0].screenX;
  };
  lay.drawer.ontouchmove = function(e){
    touchPos = e.changedTouches[0].screenX;
  };
  lay.drawer.ontouchend = function(){
    lay_top.drag = false;
    let actualScroll = lay_top.scrollLeft;
    let distance = touchPos - touchStart;
   
    // logra trasladar
    if(Math.abs(distance) > 30) {
       let mov = 0;
       let _exit = false;
       if(distance < 0 ) {
         if(in_section !== sections_list.length - 1) mov++;
         else _exit = true;
       }
       if(distance > 0 && in_section !== 0) mov--;
       in_section += mov;
       scroll(actualScroll, in_section * screen.width, mov);
       
       if(_exit){
          window.setTimeout(function(){lay.close()}, 1000);
          s_login.open();
       }
    }
    // no logra trasladar
    else scroll(actualScroll, in_section * screen.width);
  };
  
  function scroll(from, to, mov){
    let distance = from - to;
    let cirOut = progress_list[in_section - mov];
    let cirIn = progress_list[in_section];
    let secOut = sections_list[in_section - mov];
    let secIn = sections_list[in_section];
    
    dom.animate(function(n){
       lay_top.scrollLeft = from - n * distance;
       if(mov) {
         cirIn.style.background = "var(--app-control-color)";
         cirOut.style.background = "rgba(0,0,255,0)";
         secIn.style.transform = "scale(" + (0.2 + 0.8 * n) + ")";
         secOut.style.transform = "scale(" + (0.2 + 0.8 * (1 - n)) + ")";
       }
    }, 500, function(n){n = 1 - n; return 1 - Math.pow(n, 4)})
    .start();
    
  }
}