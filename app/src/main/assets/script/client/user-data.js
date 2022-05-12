/**
   USER CONNECTION
**/

function SOCKET__LoadUser (d) {
  USER = d;
  USER.name = USER.username;
  delete USER.username;
}