/** DEBUG MODE **/
app.script( PATH.lib + "/eruda.min.js", function(){
  eruda.init({
    tool: ["console", "elements", "network", "resources", "snippets"]
  });
});