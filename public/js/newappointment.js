

const urlParams = new URLSearchParams(window.location.search);
const doc_name = urlParams.get("doc_name");
const doc_id = urlParams.get("doc_id");

//console.log(myParam)

async function sendConfirmation(userData) {

  let UserTime = document.getElementById("exampleFormControlSelect2").value;

  let response = await fetch(`/form?user_name=${userData.first_name}&user_phone=${userData.phone_number}&user_date=${UserTime}&doc_id=${doc_id}`)
  let data = await response.json();
  return data
}

async function getUserInfo(user_token){
    let user_info = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getUser?user_token=${user_token}`)
    let response = await user_info.json();
    //console.log(response)
    return response;
    
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function check_cookie(callback){
    if (callback != null){
        try{
            console.log("cookie found!")
           //getUserInfo(callback).then((result) => {
           //    console.log(result.first_name)
           //})
            getUserInfo(callback).then((result) => {
                sendConfirmation(result)
            })
            //window.location.href("/")
        }
        catch(e){
            console.log(e)
        }
    }else{
        window.location.href ="/signin"
    }
}

let datausr = {phone_number:"01030533078",last_name :"abdul moneim",id:"18002",email:"ziyad@gmail.com",password:"zaqtwxse",first_name:"ziyad "}
$("#myform").submit(function (e) {
  e.preventDefault();
  //sendConfirmation(datausr)
  check_cookie(getCookie("user_token"))
   window.location.href = '/confirmation';
  console.log("jaj")
});
