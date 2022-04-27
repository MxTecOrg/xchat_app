/*
 * LIST VIEW
*/

class ListView {
  constructor( layout ) {
    let elements = layout.getElementsByClassName("list-view--l");
    for (let element of elements) {
      element.addEventListener("click", function(){
        java.soundClick();
      });
    }
    
    this.layout = layout;
    this.elements = elements;
    this.all = layout.childNodes;
  }
  
  /* method component */
  scrollTo( id ){
    let y = 0;
    let all = this.all;
    
    for(let i = 0; i < id; i++) y += all[i].offsetHeight;
    this.layout.scrollTo({
      left: 0,
      top: y,
      behavior: "smooth"
    });
  }
}