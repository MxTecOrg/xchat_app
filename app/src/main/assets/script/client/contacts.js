/**
  CONTACTS CONNECTION
**/

function SOCKET__AddContact ( data ) {
  
  if(data.status) {
    let contact = data.data;
    DB.addContact(contact);
    s_contacts.addContact(contact);
    java.toast(STRING.ADDED_CONTACT.replace("%%email%%", contact.email));
  }
  else java.toast(RAW[data.data]);
  
}