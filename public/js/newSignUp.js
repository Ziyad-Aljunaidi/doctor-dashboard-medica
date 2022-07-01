
//let tbody_clinic = document.getElementById('tbody-clinic')
//console.log(tbody_clinic.childNodes[1].childNodes[3].childNodes[1].childNodes[1])
//tbody_clinic.childNodes[1].childNodes[3].childNodes[1].childNodes[1].disabled = false
//

$(".form-check-input").click(function(e){
    let target = e.target
    let tr = target.parentNode.parentNode.parentNode
    tr.childNodes[3].childNodes[1].childNodes[1].disabled = false
    tr.childNodes[3].childNodes[1].childNodes[1].required = true

    tr.childNodes[5].childNodes[1].childNodes[1].disabled = false
    tr.childNodes[5].childNodes[1].childNodes[1].required = true
    console.log(target)
})


$("#complete-btn").click(function(e){
    e.preventDefault()
    //persnonal info
    let first_name = document.getElementById("Fname").value
    let last_name = document.getElementById("Lname").value
    let full_name = first_name +" "+last_name
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
    
    console.log(first_name, last_name, full_name, email, password, phone_number, date_of_birth, national_id)
    console.log(category, qualification, specaility)
    console.log(governorate,city,address, clinic_name,clinic_google_map, fee, fee1, reserve_option)
    getWorkingDays()
    let final_doctor_obj ={
        id : "18"+Date.now(),
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
    //window.alert(JSON.stringify(final_doctor_obj))
    fetch('https://us-central1-medica72-5933c.cloudfunctions.net/api/addNewDoctor',{
        body:JSON.stringify(final_doctor_obj),
        method:'post',
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json"
        },
    })
    setTimeout(function() {
        //your code to be executed after 1 second
        window.location.href = "/signin"
        //document.getElementById('users-div').style.display = "none"
      }, 1000);
})


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

