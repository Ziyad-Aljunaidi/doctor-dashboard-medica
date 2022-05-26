// window.onload = (event) => {
//     console.log('page is fully loaded');
//     alert("haha")
//     //setCookie("id", "18002",70)
//     if (getCookie("ids") != null ){
//         console.log("found")
//     }else{
//         console.log("not found")
//     }
//   };

check_for_cookie()

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  console.log(ca)
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


function check_for_cookie(){

    if (getCookie("doc_id") != null ){
        //alert(getCookie("doc_id"))
        
    }else{
        window.location.href = "/signin"
    }
}

