
function confirmtoggleStatus(){
    let confirm_icon_btn = document.getElementsByClassName("confirm")[0];
    let confirm_btn = document.getElementsByClassName("sts-btn-con")[0];

    let cancel_icon_btn = document.getElementsByClassName("cancel")[0];
    let cancel_btn = document.getElementsByClassName("sts-btn-can")[0];

    
    
    cancel_btn.style.display = "inline";
    cancel_icon_btn.style.display= "none"
    confirm_icon_btn.style.display= "none"
    
    console.log('sss');


}


function cancelToggleStatus(){
    let confirm_icon_btn = document.getElementsByClassName("confirm")[0];
    let confirm_btn = document.getElementsByClassName("sts-btn-con")[0];

    let cancel_icon_btn = document.getElementsByClassName("cancel")[0];
    let cancel_btn = document.getElementsByClassName("sts-btn-can")[0];

    
    
    confirm_btn.style.display = "inline";
    cancel_icon_btn.style.display= "none"
    confirm_icon_btn.style.display= "none"
    
    console.log('sss');


}

function displayClicked(){
    $("#top > div.sidebar > div:nth-child(2) > a:nth-child(1)").click(() => {
        document.getElementsByClassName("today-appointments")[0].style.display = "block";
        document.getElementsByClassName("history-appointments")[0].style.display = "none";
        document.getElementsByClassName("doctor-reviews")[0].style.display = "none";
        for(let i =0; i<=  document.getElementsByClassName("settings").length; i++){
            document.getElementsByClassName("settings")[i].style.display = "none";
        }

        }   
    )

    $("#top > div.sidebar > div:nth-child(2) > a:nth-child(2)").click(() => {
        document.getElementsByClassName("today-appointments")[0].style.display = "none";
        document.getElementsByClassName("history-appointments")[0].style.display = "block";
        document.getElementsByClassName("doctor-reviews")[0].style.display = "none";
        for(let i =0; i<=  document.getElementsByClassName("settings").length; i++){
            document.getElementsByClassName("settings")[i].style.display = "none";
        }

        }   
    )

    $("#top > div.sidebar > div:nth-child(2) > a:nth-child(3)").click(() => {
        document.getElementsByClassName("today-appointments")[0].style.display = "none";
        document.getElementsByClassName("history-appointments")[0].style.display = "none";
        document.getElementsByClassName("doctor-reviews")[0].style.display = "none";

        for(let i =0; i<=  document.getElementsByClassName("settings").length; i++){
                document.getElementsByClassName("settings")[i].style.display = "block";
            }
        }   
    )
    
    $("#top > div.sidebar > div:nth-child(2) > a:nth-child(4)").click(() => {
        document.getElementsByClassName("today-appointments")[0].style.display = "none";
        document.getElementsByClassName("history-appointments")[0].style.display = "none";
        document.getElementsByClassName("doctor-reviews")[0].style.display = "block";
        for(let i =0; i<=  document.getElementsByClassName("settings").length; i++){
            document.getElementsByClassName("settings")[i].style.display = "none";
        }

        }   
    )
}

displayClicked()


