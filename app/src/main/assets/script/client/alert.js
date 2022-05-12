/**
  LISTEN ALERT SOCKET
**/

function SOCKET__Alert (raw) {
  
  /*/ AUTHENTICATED error /*/
  if( raw.indexOf("WRONG_TOKEN") != -1 ||
      raw.indexOf("EMPTY_TOKEN") != -1 ||
      raw.indexOf("WRONG_USER") != -1 ||
      raw.indexOf("USER_NOT_FOUND") != -1 
  ) {
    app.clear_data();
    DB.deleteAllContacts();
    app.reload();
  }
  
  app.loading.hidden();
  
}

/** 
  LISTEN TOAST SOCKET
 **/
function SOCKET__Toast(raw) {
  java.toast(RAW[raw]); 
  app.loading.hidden();
}