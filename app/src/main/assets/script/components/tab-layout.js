/* 
 * TAB LAYOUT
*/

class TabLayout {
  constructor( id ){
    let width = screen.width;
    let layout = document.getElementById(id);
    let nav = layout.querySelector(".tab-layout--nav");
    let scroller = layout.querySelector(".tab-layout--body");
    let line = document.createElement("span");
    
    let tabs = nav.querySelectorAll("button");
    let layers = scroller.querySelectorAll("div");
    let tabs_length = tabs.length;
    let tab_last = tabs[0];
    
    tabs[0].style.color = "var(--app-primary-font-color)";
    line.style.width = width / tabs_length  + "px";
    
    for(let i = 0; i < tabs_length; i++){
      tabs[i].onclick = function(){
        scroller.scrollTo({
          left: i * width, 
          behavior: "smooth"
        }); // <== temporary
        tab_last.style.color = "var(--app-primary-font-lightcolor)";
        tabs[i].style.color = "var(--app-primary-font-color)";
        tab_last = tabs[i];
      };
    }
    
    scroller.onscroll = function(e){
      line.style.left = scroller.scrollLeft / tabs_length + "px";
    };
    
    
    
    /* add bottom line */
    line.setAttribute("class", "tab-layout--line");
    nav.appendChild(line);
  }
}