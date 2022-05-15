/*
 * LIST VIEW
*/

class ListView {
  constructor( layout ) {
    let elements = layout.getElementsByClassName("list-view--l");
    for (let element of elements) element.addEventListener("click", action_click_item);
    
    function action_click_item(){java.soundClick()}
    
    this.layout = layout;
    this.elements = elements;
    this.all = layout.childNodes;
  }
  
  
  getItem( id ) {return this.elements[id]}
  removeItem( id ) {return this.layout.removeChild(this.elements[id])}
  addItem(title, txt, icon) {
    let n_child = this.elements.length;
    let layer = DOM.createElement("li");
    let icon_layer = DOM.createElement("span");
    let text_layer = DOM.createElement("div");
    let text_title = DOM.createElement("strong");
    let text_text = DOM.createElement("p");
    
    text_title.innerText = title?title:"";
    text_text.innerText = txt?txt:"";
    layer.setAttribute("class", "list-view--l");
    if(typeof icon == "string") {
      let icon_el = DOM.createElement("i");
      icon_el.setAttribute("class", "fa fa-" + icon);
      icon_layer.appendChild(icon_el);
    }
    else if(typeof icon == "object"? icon instanceof HTMLElement : false) {
      icon_layer.appendChild(icon);
    }
    
    text_layer.appendChild(text_title);
    text_layer.appendChild(text_text);
    layer.appendChild(icon_layer);
    layer.appendChild(text_layer);
    this.layout.appendChild(layer);
    return n_child;
  }
  addDivider() {
    let divider = DOM.createElement("li");
    divider.setAttribute("class", "list-view--divider");
    this.layout.appendChild(divider);
    return divider;
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