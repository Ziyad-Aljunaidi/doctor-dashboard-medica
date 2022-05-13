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
            //window.location.href("/")
        }
        catch(e){
            console.log(e)
        }
    }else{
        window.location.href ="/signin"
    }
}
console.log(getCookie("user_token"))
console.log("jaja")