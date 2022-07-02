$(window).on("load", function () {

    getDoctorInfo(getCookie("doc_id")).then((result) =>{
        console.log(result)
        putDocInfoInProfileDiv(result)
        putDocInfoInEditDiv(result)
        document.getElementById("loading-screen").style.display = "none"
    })

});

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

doc_id = getCookie("doc_id")
async function getDoctorInfo(doc_id){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getdoctor?doc_id=${doc_id}`)
    let data = await response.json()
    return data
}

function formatTime(str, index, stringToAdd) {
    return (
      str.substring(0, index) + stringToAdd + str.substring(index, str.length)
    );
  }
function checkTimeFormat(user_time) {
  if (user_time.length == 3) {
    return formatTime(user_time, 1, ":");
  } else {
    return formatTime(user_time, 2, ":");
  }
}



async function putDocInfoInProfileDiv(data){
    document.getElementById("doctor_name").innerHTML ="Dr."+data.name
    document.getElementById("doctor_email").innerHTML ='Email: '+data.email
    document.getElementById("doctor_category").innerHTML ="Speciality: "+data.category
    document.getElementById("doctor_qualifications").innerHTML ="Qualifications: "+data.qualification
    document.getElementById("doctor_birthday").innerHTML =`<small class="text-muted">Date of birth: ${data.date_of_birth}</small></p>`
}


async function putDocInfoInEditDiv(data){

    //PERSONAL INFO
    document.getElementById("Fname").value = data.name
    //document.getElementById("Lname").value = data.last_name
    document.getElementById("Email").value = data.email
    document.getElementById("Password").value = data.password
    document.getElementById("PhoneNumber").value = data.phone_number
    document.getElementById("Birthday").value = data.date_of_birth
    document.getElementById("NID").value = data.national_id

    //MEDICAL INFO
    document.getElementById("Speciality").value = data.category
    document.getElementById("Qualification").value = data.qualification
    document.getElementById("Experience").value = data.specaility

    //CLINIC INFO
    document.getElementById("Governorate").value = data.governorate
    document.getElementById("City").value = data.city
    document.getElementById("Address").value = data.address
    document.getElementById("ClinicName").value = data.clinics[0].clinic_name
    document.getElementById("ClinicMap").value = data.google_map
    document.getElementById("fee-examination").value = data.fee
    document.getElementById("fee-consultation").value = data.fee1
    document.getElementById("avg-time").value = data.clinics[0].working_days[0].average_time

    let reserve_option = data.clinics[0].reserve_option
    if(reserve_option == "0"){
        document.getElementById("weekly").checked = true
    }else if(reserve_option == "1"){
        document.getElementById("monthly").checked = true
    }else{
        document.getElementById("annually").checked = true
    }

    let working_days = data.clinics[0].working_days
    console.log(working_days)
    for(let i = 0; i<working_days.length; i++){
        let day = document.getElementById(`${working_days[i].day}`)
        day.checked = true
        let parent_element = day.parentElement.parentElement.parentElement
        let from = parent_element.childNodes[3].childNodes[1].childNodes[1]
        let to = parent_element.childNodes[5].childNodes[1].childNodes[1]
        parent_element.childNodes[5]

        if(working_days[i].to.length == 3){
            let actual_to_time = working_days[i].to+1200
            to.value = checkTimeFormat(actual_to_time.toString())
            to.disabled = false
        }else{
            let actual_to_time = working_days[i].to+1200
            to.value = checkTimeFormat(actual_to_time.toString())
            to.disabled = false
        }
        
        if(working_days[i].to.length == 3){
            let actual_from_time = working_days[i].from+1200
            from.value = checkTimeFormat(actual_from_time.toString())
            from.disabled = false
        }else{
            let actual_from_time = working_days[i].from+1200
            from.value = checkTimeFormat(actual_from_time.toString())
            from.disabled = false
        }
        //to.value = "10:30"
        console.log(from, to,)
    }
}

$(".form-check-input").click(function(e){
    console.log(e.target.checked)
    if(e.target.checked == false){
        e.checked = false
        let target = e.target

        let tr = target.parentNode.parentNode.parentNode
        tr.childNodes[3].childNodes[1].childNodes[1].disabled = true
        tr.childNodes[3].childNodes[1].childNodes[1].value = 0
        tr.childNodes[3].childNodes[1].childNodes[1].required = false
    
        tr.childNodes[5].childNodes[1].childNodes[1].disabled = true
        tr.childNodes[5].childNodes[1].childNodes[1].value = 0
        tr.childNodes[5].childNodes[1].childNodes[1].required = false
        console.log(target.checked)
    }else{

        let target = e.target
        let tr = target.parentNode.parentNode.parentNode
        tr.childNodes[3].childNodes[1].childNodes[1].disabled = false
        tr.childNodes[3].childNodes[1].childNodes[1].required = true

        tr.childNodes[5].childNodes[1].childNodes[1].disabled = false
        tr.childNodes[5].childNodes[1].childNodes[1].required = true
        console.log(target)
    }
})

$("#complete-btn").click(async function(e){
    e.preventDefault()
    //persnonal info
    let first_name = document.getElementById("Fname").value

    let full_name = first_name
    let email = document.getElementById("Email").value
    let password = document.getElementById("Password").value
    let date_of_birth = document.getElementById("Birthday").value
    let phone_number =  document.getElementById("PhoneNumber").value
    let national_id =  document.getElementById("NID").value

    //medical info
    let category =document.getElementById("Speciality").value
    let qualification =document.getElementById("Qualification").value
    let specaility =document.getElementById("Experience").value

    //clinic info
    let governorate =document.getElementById("Governorate").value
    let city =document.getElementById("City").value
    let address =document.getElementById("Address").value
    let clinic_name = document.getElementById("ClinicName").value
    let clinic_google_map = document.getElementById("ClinicMap").value

    let fee =document.getElementById("fee-examination").value
    let fee1= document.getElementById("fee-consultation").value
    let reserve_option = getReserveOption();

    let working_days = getWorkingDays()
    
    console.log(first_name, full_name, email, password, phone_number, date_of_birth, national_id)
    console.log(category, qualification, specaility)
    console.log(governorate,city,address, clinic_name,clinic_google_map, fee, fee1, reserve_option)
    getWorkingDays()
    let final_doctor_obj ={
        id : doc_id,
        name:full_name,
        email: email,
        password: password,
        date_of_birth: date_of_birth,
        gender: "male",
        phone_number: phone_number,
        qualification: qualification,
        specaility: specaility,
        category: category,
        address: address,
        governorate: governorate,
        national_id: national_id,
        city: city,
        google_map: clinic_google_map,
        fee:fee,
        fee1: fee1,
        clinics:[{
            address:address,
            clinic_code:"0",
            clinic_name: clinic_name,
            google_map: clinic_google_map,
            reserve_option: reserve_option,
            working_days:getWorkingDays()
        }]

    }

    //console.log(document.getElementById("myForm").submit())
    console.log(JSON.stringify(final_doctor_obj,0,2))
    //window.alert(JSON.stringify(getWorkingDays()))
    fetch('https://us-central1-medica72-5933c.cloudfunctions.net/api/editDoctorInfo',{
        body:JSON.stringify(final_doctor_obj),
        method:'post',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        },
    })
    setTimeout(function() {
        //your code to be executed after 1 second
        window.location.href = "/"
        //document.getElementById('users-div').style.display = "none"
      }, 1000);

    //onsole.log("lOGAGA")
    //oToHome()
})

function goToHome(){
    window.location.href = "https://doctor.medica72.com"
}


function getReserveOption(){
    let reserve_option_elements= document.querySelector("#top > form > div > div.container.edit-clinic-Info.settings > div.card.mb-12 > div > div:nth-child(1) > div > div:nth-child(8) > div") 
    let reserve_option_list = []
    let reserve_option;
    reserve_option_list.push(reserve_option_elements.childNodes[1].childNodes[1])
    reserve_option_list.push(reserve_option_elements.childNodes[3].childNodes[1])
    reserve_option_list.push(reserve_option_elements.childNodes[5].childNodes[1])
    for(let i =0; i<reserve_option_list.length;i++){
        if(reserve_option_list[i].checked == true){
            reserve_option = reserve_option_list[i].value
            //console.log(reserve_option)
        }
    }
    //console.log(reserve_option_list)
    return reserve_option
}

function getWorkingDays(){
    let tbody = document.getElementById('tbody-clinic').childNodes
    let working_days_list = []
    let average_time = document.getElementById("avg-time").value
    for(let i =0; i<tbody.length; i++){
        if(tbody[i].length == undefined ){
            table_radio = tbody[i].childNodes[1].childNodes[1].childNodes[1]
            if(tbody[i].childNodes[1].childNodes[1].childNodes[1].checked){
                let day = tbody[i].childNodes[1].childNodes[1].childNodes[1].id
                let day_num = tbody[i].childNodes[1].childNodes[1].childNodes[1].value
                let from_hrs = tbody[i].childNodes[3].childNodes[1].childNodes[1].value
                let to_hrs = tbody[i].childNodes[5].childNodes[1].childNodes[1].value

                from_hrs= from_hrs.replace(":", "")
                to_hrs= to_hrs.replace(":", "")

                if(parseInt(from_hrs) > 1200){
                    from_hrs = parseInt(from_hrs) - 1200
                    from_hrs = from_hrs.toString();
                }

                if(parseInt(to_hrs) > 1200){
                    to_hrs = parseInt(to_hrs) - 1200
                    to_hrs = to_hrs.toString();
                }
                working_day_obj ={
                    "day_num": parseInt(day_num),
                    "day":day,
                    "from":parseInt(from_hrs),
                    "to":parseInt(to_hrs),
                    "average_time": parseInt(average_time)
                }
                working_days_list.push(working_day_obj)
                //console.log(from_hrs, to_hrs, day, day_num)
            }
        }
        
    }
    console.log(working_days_list)
    return working_days_list
    //console.log(tbody.childNodes)
}



