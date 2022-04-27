function s_login () {
  let lay = dom.create("div");
  lay.id = "login-layout";
  dom.add(lay);
  lay = Drawer.UI("login-layout", {
    draggable: false,
    position: "right",
    size: screen.width,
    duration: 300,
    opacity: 0,
  });
  lay.drawer.style.height = "100%";
  
  // elements register //
  let register_layout = dom.create("div");
  let register_body = dom.create("div");
  let register_head = dom.create("h2");
  let register_submit = dom.create("button");
  let register_change = dom.create("a");
  
  register_change.href = "#";
  register_change.dom.set("class", "login-toggle");
  register_layout.dom.set("class", "login-layout");
  register_head.dom.set("class", "login-layout--head");
  register_body.dom.set("class", "login-layout--body");
  register_submit.dom.set("class", "login-layout--submit");
  
  register_head.innerText = "Registrarse";
  register_submit.innerText = "Enviar";
  
  // elements auth //
  let auth_layout = dom.create("div");
  let auth_body = dom.create("div");
  let auth_head = dom.create("h2");
  let auth_submit = dom.create("button");
  let auth_change = dom.create("a");
  
  auth_change.href = "#";
  auth_change.dom.set("class", "login-toggle");
  auth_layout.dom.set("class", "login-layout hidden");
  auth_layout.style.display = "none";
  auth_head.dom.set("class", "login-layout--head");
  auth_body.dom.set("class", "login-layout--body");
  auth_submit.dom.set("class", "login-layout--submit");
  
  auth_submit.innerText = "Acceder";
  auth_head.innerText = "Iniciar Sesión";
  
  //elements verify
  let verify_layout = dom.create("div");
  let verify_head = dom.create("h2");
  let verify_body = dom.create("div");
  let verify_txt = dom.create("small");
  let verify_re = dom.create("a");
  
  verify_re.href = "#";
  verify_re.dom.set("class", "login-toggle");
  verify_re.innerText = "Reenviar token";
  verify_layout.dom.set("class", "login-layout hidden");
  verify_layout.style.display = "none";
  verify_head.dom.set("class", "login-layout--head");
  verify_head.innerText = "Verificación";
  verify_body.dom.set("class", "login-layout--body");
  
  /* components edittext */
  let r_name = create_input("Usuario:");
  let r_email = create_input("Email:");
  let r_pass = create_input("Contraseña:");
  let r_rpass = create_input("Repite la contraseña:");
  let a_name = create_input("Usuario:");
  let a_pass = create_input("Contraseña:");
  let v_token = create_input("Token:");
  
  function create_input (txt) {
    let _cont= dom.create("div");
    let _input = dom.create("input");
    let _label = dom.create("label");
    let _line = dom.create("span");
    
    _cont.dom.set("class", "edit-text");
    _input.dom.set("class", "edit-text__input");
    _label.dom.set("class", "edit-text__label");
    _line.dom.set("class", "edit-text__line");
    
    _input.dom.set("placeholder", " ");
    _label.innerText = txt;
    _cont.dom.add([ _input, _label, _line ]);
    
    return {
      layout: _cont,
      input: _input
    };
  }
  
  
  // switch register/auth //
  register_change.innerText = "¿Ya tienes una cuenta?";
  auth_change.innerText = "¿Aún no tienes una cuenta? Regístrate.";
  register_change.onclick = function(){
    _change(auth_layout, register_layout);
  };
  auth_change.onclick = function(){
    _change(register_layout, auth_layout);
  };
  
  function _change(layIn, layOut){
    app.wall.show();
    
    // animation alternate auth/register
    dom.animate(function(n){
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
  register_body.dom.add([ r_name.layout, r_email.layout, r_pass.layout, r_rpass.layout ]);
  register_layout.dom.add([register_head, register_body, register_submit, register_change]);
 
  auth_body.dom.add([ a_name.layout, a_pass.layout ]);
  auth_layout.dom.add([ auth_head, auth_body, auth_submit, auth_change ]);
 
  verify_body.dom.add([verify_txt, v_token.layout]);
  verify_layout.dom.add([verify_head, verify_body, verify_re]);
 
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
        if(data.status) {
          USER.user = req.username;
          USER.email = req.email;
          USER.pass = req.password;
          verify_txt.innerText = "Se te a enviado un token de verificación a tu correo " + USER.email;
          app.save_data("user-data", USER);
          _change(verify_layout, register_layout);
        }
        else app.alert(data.data)
      },
      error: function(s){ 
        app.alert("Error " + s);
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
          s_login.ok(data.data);
        }
        else app.alert(data.data);
        app.loading.hidden();
      },
      error: function(s){ 
        app.alert("Error " + s);
        app.loading.hidden();
      }
    })
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
          if(data.status) s_login.ok(data.data);
          else app.alert(data.data);
          app.loading.hidden();
        },
        error: function(s){
          app.alert("Error " + s);
          app.loading.hidden();
        }
      });
    }
  };
  
  // resend verify //
  verify_re.onclick = function(){
    app.loading.show();
    verify_re.style.display = "none";
    
    server.process({
      url: URL.resendToken,
      data: {email: USER.email},
      data_type: "json",
      method: "POST",
      success: function(data){
        if(data.status) app.alert("enviado");
        else app.alert(data.data);
        app.loading.hidden();
      },
      error: function(s){ 
        app.alert("Error " + s);
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
  TOKEN = app.save_data("token" , token);
  s_login.close();
  InitMainApp();
  app.save_data("authenticated", true);
  app.loading.hidden();
}