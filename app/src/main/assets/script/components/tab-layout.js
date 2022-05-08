/* 
 * TAB LAYOUT
*/

class TabLayout {
  constructor( layout ){
    let width = screen.width;
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
    
    scroller.onscroll = function(){
      line.style.left = scroller.scrollLeft / tabs_length + "px";
    };
    
    /* add bottom line */
    line.setAttribute("class", "tab-layout--line");
    nav.appendChild(line);
    
    this.tabs = tabs;
    this.layers = layers;
  }
  
  /* method component */
  open ( id ) { this.tabs[id].click() }
  getLayer ( id ) { return this.layers[id] }
  getTab ( id ) { return this.tabs[id] }
}