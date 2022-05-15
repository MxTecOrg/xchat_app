/**
  WELCOME SCREEN
**/

function s_welcome () {
  // container layout //
  let lay = DOM.createElement("div");
  lay.id = "welcome-layout";
  DOM.body.appendChild(lay);

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
  let lay_toggle = DOM.createElement("i");
  let toggle_on = theme.is == "dark";
  lay_toggle.setAttribute("class", "w-toggle fa fa-" + (toggle_on?"sun":"moon") + "-o fa-lg");
  s_welcome.toggle_theme = lay_toggle;
 
  lay_toggle.onclick = function(e){
    e.stopPropagation();
    e.preventDefault();
    if(!toggle_on) {
      theme.dark();
      app.save_data("theme", "dark");
      lay_toggle.setAttribute("class", "w-toggle fa fa-sun-o fa-lg");
    }
    else {
      theme.light();
      app.save_data("theme", "light");
      lay_toggle.setAttribute("class", "w-toggle fa fa-moon-o fa-lg");
    }
    toggle_on = !toggle_on;
  };
  
  // top layout //
  let lay_top = DOM.createElement("div");
  let box_lay_top = DOM.createElement("div");
  let sections_list = [];
  let progress_list = [];
  
  box_lay_top.style.display = "flex";
  box_lay_top.style.height = "100%";
  lay_top.id = "welcome-layout--top";
  
  create_section(PATH.img + "/foto1.png", STRING.WELCOME_1);
  create_section(PATH.img + "/foto2.png", STRING.WELCOME_2);
  create_section(PATH.img + "/foto3.png", STRING.WELCOME_3);
  create_section(PATH.img + "/foto4.png", STRING.WELCOME_4);
  box_lay_top.style.width = sections_list.length * 100 + "%";
  
  // crear seccion //
  function create_section(url, txt){
    let div = DOM.createElement("div");
    let img = DOM.createElement("img");
    let info = DOM.createElement("p");
    let circle = DOM.createElement("div");
    
    circle.setAttribute("class", "circle-disabled");
    div.setAttribute("class", "welcome-section");
    progress_list.push(circle);
    sections_list.push(div);
    
    img.src = url;
    info.innerText = txt;
    div.appendChild(img);
    div.appendChild(info);
    box_lay_top.appendChild(div);
  }
  
  // bottom layout //
  let lay_bottom = DOM.createElement("div");
  lay_bottom.id = "welcome-layout--bottom";
  for(let element of progress_list) lay_bottom.appendChild(element);
  
  lay.on("open", function(){
    
    app.animate(function(n){
      lay_bottom.style.top = 60 * ( 1 - n ) + "px";
      lay_bottom.style.filter = "opacity(" + n + ")";
    }, 700).start();
    
    app.animate(function(n){
      lay_top.style.left = 60 * ( 1 - n ) + "px";
      lay_top.style.filter = "opacity(" + n + ")";
    }, 700).start();
  });

  // add layouts //
  lay_top.appendChild(box_lay_top);
  lay.add(lay_top);
  lay.add(lay_bottom);
  DOM.body.appendChild(lay_toggle);
  
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
    
    app.animate(function(n){
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