/**
  CONTACTS CONNECTION
**/

function SOCKET__AddContact ( d ) {
  app.debug("ws->add-contact", d);
  app.save_json(d.user_id, d, "contacts");
  
  /* callback */
  if(SOCKET__AddContact.callback){
    SOCKET__AddContact.callback(d);
    delete SOCKET__AddContact.callback;
  }
}