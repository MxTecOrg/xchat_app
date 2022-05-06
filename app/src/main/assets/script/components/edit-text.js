/**
  UI EDIT TEXT
**/

class EditTextUI {
  constructor (element) {
    let input = document.createElement("input");
    let label = document.createElement("label");
    let line = document.createElement("span");
    
    element.setAttribute("class", "edit-text");
    input.setAttribute("class", "edit-text__input");
    label.setAttribute("class", "edit-text__label");
    line.setAttribute("class", "edit-text__line");
    
    input.setAttribute("placeholder", " ");
    
    element.appendChild(input);
    element.appendChild(label);
    element.appendChild(line);
    
    this.layout = element;
    this.input = input;
    this.label = label;
  }
  
  get placeholder () { return this.label.textContent }
  set placeholder (txt) { this.label.innerText = txt }
  
  get value () { return this.input.value }
  set value (txt) { this.input.value = txt }
  
  focus(){ this.input.focus() }
}