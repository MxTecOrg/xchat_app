function s_login () {
  let lay = DOM.createElement("div");
  lay.id = "login-layout";
  DOM.body.appendChild(lay);
  
  lay = Drawer.UI("login-layout", {
    draggable: false,
    position: "right",
    size: app.width,
    css_size: "100vw",
    duration: 300,
    opacity: 1,
  });
  lay.shadow.style.backgroundColor = "var(--app-accent-color)";
  lay.drawer.style.height = "100%";
  
  // elements register //
  let register_layout = DOM.createElement("div");
  let register_body = DOM.createElement("div");
  let register_head = DOM.createElement("h2");
  let register_submit = DOM.createElement("button");
  let register_change = DOM.createElement("a");
  
  register_change.href = "#";
  register_change.setAttribute("class", "login-toggle");
  register_layout.setAttribute("class", "login-layout");
  register_head.setAttribute("class", "login-layout--head");
  register_body.setAttribute("class", "login-layout--body");
  register_submit.setAttribute("class", "login-layout--submit");
  
  register_head.innerText = STRING.REGISTER;
  register_submit.innerText = STRING.SEND;
  
  // elements auth //
  let auth_layout = DOM.createElement("div");
  let auth_body = DOM.createElement("div");
  let auth_head = DOM.createElement("h2");
  let auth_submit = DOM.createElement("button");
  let auth_change = DOM.createElement("a");
  
  auth_change.href = "#";
  auth_change.setAttribute("class", "login-toggle");
  auth_layout.setAttribute("class", "login-layout hidden");
  auth_layout.style.display = "none";
  auth_head.setAttribute("class", "login-layout--head");
  auth_body.setAttribute("class", "login-layout--body");
  auth_submit.setAttribute("class", "login-layout--submit");
  
  auth_submit.innerText = STRING.ACCESS;
  auth_head.innerText = STRING.LOGIN;
  
  //elements verify
  let verify_layout = DOM.createElement("div");
  let verify_head = DOM.createElement("h2");
  let verify_body = DOM.createElement("div");
  let verify_txt = DOM.createElement("small");
  let verify_re = DOM.createElement("a");
  
  verify_re.href = "#";
  verify_re.setAttribute("class", "login-toggle");
  verify_re.innerText = STRING.RESEND_TOKEN;
  verify_layout.setAttribute("class", "login-layout hidden");
  verify_layout.style.display = "none";
  verify_head.setAttribute("class", "login-layout--head");
  verify_head.innerText = STRING.VERIFY_TOKEN;
  verify_body.setAttribute("class", "login-layout--body");
  
  /* components edittext */
  let r_name = create_input(STRING.USER + ":");
  let r_email = create_input(STRING.EMAIL + ":");
  let r_pass = create_input(STRING.PASSWORD + ":");
  let r_rpass = create_input(STRING.REPASSWORD + ":");
  let a_name = create_input(STRING.USER + ":");
  let a_pass = create_input(STRING.PASSWORD + ":");
  let v_token = create_input(STRING.TOKEN + ":");
  
  function create_input (txt) {
    let input = new EditTextUI(DOM.createElement("div"));
    input.placeholder = txt;
    return input;
  }
  
  
  // switch register/auth //
  register_change.innerText = STRING.TO_LOGIN;
  auth_change.innerText = STRING.TO_REGISTER;
  register_change.onclick = function(){
    _change(auth_layout, register_layout);
  };
  auth_change.onclick = function(){
    _change(register_layout, auth_layout);
  };
  
  function _change(layIn, layOut){
    app.wall.show();
    
    // animation alternate auth/register
    app.animate(function(n){
        let traslate = 0;
        if(n < 0.5) {
          traslate = 400 * n;
          layOut.style.zIndex = 2;
          layIn.style.zIndex = 1;
        }
        else {
          traslate = 400 * (1 - n);
          layOut.style.zIndex = 1;
          layIn.style.zIndex = 2;
        }
        
        layOut.style.transform = 
           "scale(" + (0.6 + 0.4 * (1 - n)) + ") " +
           "translateX(" + (-traslate) + "px)";
        layOut.style.filter = "opacity(" + (1 - n) + ")";
       
        layIn.style.transform = 
           "scale(" + (0.6 + 0.4 * n) + ") " +
           "translateX(" + traslate + "px)";
        layIn.style.filter = "opacity(" + n + ")";
        layIn.style.display = "flex";
    }, 1000, function(n){return 1 - Math.pow(1 - n, 4)})
    
      .finish(function(){
        layOut.style.display = "none";
        app.wall.hidden();
        
        layIn = null; layOut = null;
      })
      .start();
  }
  
  
  // add layout
  register_body.appendChild(r_name.layout);
  register_body.appendChild(r_email.layout);
  register_body.appendChild(r_pass.layout);
  register_body.appendChild(r_rpass.layout);
  
  register_layout.appendChild(register_head);
  register_layout.appendChild(register_body);
  register_layout.appendChild(register_submit);
  register_layout.appendChild(register_change);
 
  auth_body.appendChild(a_name.layout);
  auth_body.appendChild(a_pass.layout);
 
  auth_layout.appendChild(auth_head);
  auth_layout.appendChild(auth_body);
  auth_layout.appendChild(auth_submit);
  auth_layout.appendChild(auth_change);
 
  verify_body.appendChild(verify_txt);
  verify_body.appendChild(v_token.layout);
  
  verify_layout.appendChild(verify_head);
  verify_layout.appendChild(verify_body);
  verify_layout.appendChild(verify_re);
 
  lay.drawer.appendChild(auth_layout);
  lay.drawer.appendChild(register_layout);
  lay.drawer.appendChild(verify_layout);
  s_login.layout = lay;
  
  // submit register //
  register_submit.onclick = function(){
    /* name, email, pass, rpass*/
    app.loading.show();
    let req =  {
      username: r_name.input.value,
      email: r_email.input.value,
      password: r_pass.input.value,
      rpassword: r_rpass.input.value
    };
    server.process({
      url: URL.register, 
      method: "POST",
      data: req,
      data_type: "json",
      success: function(data){
        app.loading.hidden();
        app.debug("register", data.data);
        if(data.status) {
          USER.name = req.username;
          USER.email = req.email;
          USER.pass = req.password;
          verify_txt.innerText = STRING.INFO_VERIFY_TOKEN.replace("%%email%%", USER.email);
          app.save_data("user-data", USER);
          _change(verify_layout, register_layout);
        }
        else java.toast(RAW[data.data]);
      },
      error: function(s){ 
        app.debug("register", "http-error:" + s);
        java.toast("HTTP-Error: " + s);
        app.loading.hidden();
      }
    });
  }
  
  // submit login //
  auth_submit.onclick = function(){
    app.loading.show();
    let req = {
      username: a_name.input.value,
      password: a_pass.input.value
    };
    server.process({
      url: URL.login, 
      method: "POST",
      data_type: "json",
      data: req,
      success: function(data){
        
        if(data.status){
          USER.name = req.username;
          USER.pass = req.password;
          app.debug("login", "OK");
          s_login.ok(data.data);
        }
        else {
          app.debug("login", data.data);
          if(data.data == "ACC_NOT_VERIFIED"){
            USER.name = req.username;
            USER.pass = req.password;
            USER.email = data.email;
            _change(verify_layout, auth_layout);
            resend_token();
          }
          else java.toast(RAW[data.data]);
        }
        app.loading.hidden();
      },
      error: function(s){ 
        app.debug("login", "http-error:" + s);
        java.toast("HTTP-Error: " + s);
        app.loading.hidden();
      }
    });
  };
  
  // submit verify //
  v_token.input.oninput = function(e){
    let input = e.target;
    if(input.value.length >= 5){
      app.loading.show();
      input.value = input.value.substr(0, 5);
      server.process({
        url: URL.verify,
        method: "POST",
        data_type: "json",
        data: {
          email: USER.email,
          token: input.value
        }, 
        success: function(data) {
          if(data.status) server.process({
            url: URL.login,
            method: "POST",
            data_type: "json",
            data: {
              username: USER.name,
              password: USER.pass
            },
            success: function(data){
              app.debug("verify token", data.data)
              s_login.ok(data.data)
            },
            error: function(s){
              java.toast("HTTP-Error: " + s);
              app.debug("verify token", "http-error:" + s);
            }
          });
          else {
            java.toast(RAW[data.data]);
            app.debug("verify token", data.data);
          }
          app.loading.hidden();
        },
        error: function(s){
          java.toast("HTTP-Error: " + s);
          app.debug("verify token", "http-error:" + s);
          app.loading.hidden();
        }
      });
    }
  };
  
  // resend verify //
  verify_re.onclick = resend_token;
  function resend_token(){
    app.loading.show();
    
    server.process({
      url: URL.resendToken,
      data: {email: USER.email},
      data_type: "json",
      method: "POST",
      success: function(data){
        if(data.status) {
          verify_re.style.display = "none";
          app.debug("re-verify token", data.data);
        }
        else app.debug("re-verify token", data.data);
        java.toast(RAW[data.data]);
        app.loading.hidden();
      },
      error: function(s){
        java.toast("HTTP-Error: " + s);
        app.debug("re-verify token", "http-error: " + s);
        app.loading.hidden();
      }
    })
  }
  
  // is register //
  if( USER.email ) _change(verify_layout, register_layout);
}

s_login.open = function(){ s_login.layout.open() };
s_login.close = function(){ s_login.layout.close() };
s_login.ok = function(token){
  app.loading.show();
  
  TOKEN = app.save_data("token" , token); //save token
  s_welcome.toggle_theme.style.display = "none"; //hidden toggle theme
  s_login.close(); //close login screen
  app.save_data("authenticated", true); //save authenticated state
  InitMainApp(); //init app
  
  app.loading.hidden();
}