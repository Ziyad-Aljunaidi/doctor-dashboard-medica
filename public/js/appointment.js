
 

/*
const { getStorage } = require ("firebase/storage");
const { ref } = require ("firebase/storage");
const { initializeApp } = require("firebase/app")
const { uploadBytes } = require("firebase/storage")
*/




function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  //console.log(ca)
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

let doc_id = getCookie("doc_id")

async function getAppointments(doc_id ){
  let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getAppointments?doc_id=${doc_id}`);
  let data = await response.json()
  let refinded_data = data.patients.sort(function(a,b){return a.user_time-b.user_time})
  return refinded_data
}

async function getUSerName(user_id){
  let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getUser?user_id=${user_id}`);
  let data = await response.json()
  let user_name = data.first_name + " " + data.last_name;
  return user_name
}

function formatTime(str, index, stringToAdd){
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}
function checkTimeFormat(user_time){
  
  if(user_time.length == 3){
    return formatTime(user_time, 1, ':')
  }else{
    return formatTime(user_time, 2, ':')
  }
}

async function statusCheck(doc_id, user_id, user_time, status_code, reason_code, fees, prescription, clinic_code){
  let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/status_appointment?doc_id=${doc_id}&user_id=${user_id}&user_time=${user_time}&status_code=${status_code}&reason_code=${reason_code}&fees=${fees}&prescription=${prescription}&clinic_code=${clinic_code}`);
}

function confirmBtn(doc_id, user_id, user_time, status_code, reason_code, fees, prescription, clinic_code){
  btn_confirm = `<a style='color:white' role='button' onclick="statusCheck('${doc_id}', '${user_id}', '${user_time}', '${status_code}', '${reason_code}', '${fees}', '${prescription}', '${clinic_code}')" class='badge badge-success'><i class='fa fa-check'  aria-hidden='true'></i></a>`;
  return btn_confirm
}

function cancelBtn(doc_id, user_id, user_time, status_code, reason_code, fees, prescription, clinic_code){
  btn_cancel = `<a style='color:white' role='button' onclick="statusCheck('${doc_id}', '${user_id}', '${user_time}', '${status_code}', '${reason_code}', '${fees}', '${prescription}', '${clinic_code}')" class='badge badge-danger'><i class='fa fa-times'  aria-hidden='true'></i></a>`;
  return btn_cancel
}

function btnUploadPrescription(appointment){
  let btn_upload_prescription = `<a role='button' onclick='getUploadForm(${JSON.stringify(appointment)})' class='badge badge-warning'>Upload Prescription</a>`;
  return btn_upload_prescription
}

function btnViewPrescription(prescription_url){
  let btn_view_prescription = `<a style='color:white' href='${prescription_url}' class='badge badge-primary'>View Prescription</a>`;
  return btn_view_prescription
}
// Badges
let badge_complete = "<span class='badge badge-success'>Completed</span>"
let badge_pending = "<span class='badge badge-warning'>Pending</span>"
let badge_confirmed = "<span class='badge badge-primary'>Confirmed</span>"
let badge_cancelled = "<span class='badge badge-danger'>Cancelled</span>"
let badge_examination = "<span class='badge badge-primary'>Examination</span>"
let badge_consultation = "<span class='badge badge-secondary'>Consultation</span>"

// Buttons 
let btn_confirm = "<a style='color:white' role='button' onclick='actionBtn()' class='badge badge-primary'><i class='fa fa-check'  aria-hidden=true'></i></a>";
let btn_cancel = "<a style='color:white' role='button' onclick='getCurrentNode()' class='badge badge-danger'><i class='fa fa-times'  aria-hidden=true'></i></a>";
//let btn_upload_prescription = "<a role='button' onclick='getUploadForm()' class='badge badge-warning'>Upload Prescription</a>";
//let btn_view_prescription = "<a style='color:white' role='button' class='badge badge-primary'>View Prescription</a>";
let btn_view_history = "<a style='color:white' href class='badge badge-secondary'>View History</a>";


async function appointments_to_table(appointments, clinic_code){

  let table_body = document.querySelector("#top > div.doctor-dashboard > div.container.today-appointments > div.card.mb-12 > table > tbody")
  table_body.innerHTML = ""
  
  for(let i=0; i<appointments.length; i++){

    if(appointments[i].clinic == clinic_code){
      let table_r = document.createElement("tr");
      let table_h1 = document.createElement("th");
      let table_h2 = document.createElement("td");
      let table_h3 = document.createElement("td");
      let table_h4 = document.createElement("td");
      let table_h5 = document.createElement("td");
      let table_h6 = document.createElement("td");
      let table_h7 = document.createElement("td");
      let table_h8 = document.createElement("td");
      let table_h9 = document.createElement("td");
      let table_h10 = document.createElement("td");
      
      table_h1.innerHTML = i+1
      
  
      table_h2.innerHTML = await getUSerName(appointments[i].user_id)
      
  
      table_h3.innerHTML = appointments[i].date_stamp;
      
      
      table_h4.innerHTML = checkTimeFormat(appointments[i].user_time);
      
      // APPOINTMENT REASON EXAMINTATION-CONSULTATION
      if(appointments[i].reason_code == "1"){
        table_h5.innerHTML = badge_examination
      }else{
        table_h5.innerHTML = badge_consultation;
      }
      
      // APPOINTMENT FEES
      table_h6.innerHTML = appointments[i].fees
      
      // CHECK FOR STATUS
      if(appointments[i].status_code == "1"){
        table_h7.innerHTML = badge_pending;
      }else if(appointments[i].status_code == "2"){
        table_h7.innerHTML = badge_confirmed
      }else if(appointments[i].status_code == "3"){
        table_h7.innerHTML = badge_complete
      }else{
        table_h7.innerHTML = badge_cancelled;
      }
      
      // CONFIRM-CANCEL BUTTON
      table_h8.innerHTML = confirmBtn(doc_id, appointments[i].user_id, appointments[i].user_time, '2', appointments[i].reason_code, appointments[i].fees, appointments[i].prescription, appointments[i].clinic) +" "+ cancelBtn(doc_id, appointments[i].user_id, appointments[i].user_time, '4', appointments[i].reason_code, appointments[i].fees, appointments[i].prescription, appointments[i].clinic)
      
      // PRESCRIPTION
      if(appointments[i].prescription != "none"){
        table_h9.innerHTML = btnViewPrescription(appointments[i].prescription)
      }else{ 
        table_h9.innerHTML = btnUploadPrescription(appointments[i]);
      }
      

      table_h10.innerHTML = btn_view_history;
      table_r.appendChild(table_h1);
      table_r.appendChild(table_h2)
      table_r.appendChild(table_h3);
      table_r.appendChild(table_h4);
      table_r.appendChild(table_h5)
      table_r.appendChild(table_h6);
      table_r.appendChild(table_h7);
      table_r.appendChild(table_h8);
      table_r.appendChild(table_h9)
      table_r.appendChild(table_h10);
      table_body.appendChild(table_r)
    }    
  }
  document.querySelector("#loading-screen").style.display = "none";
}


async function appointments_to_table_inrange(appointments, clinic_code, start_date, end_date){
  start_date = Date.parse(start_date)
  end_date = Date.parse(end_date)
  let table_body = document.querySelector("#top > div.doctor-dashboard > div.container.today-appointments > div.card.mb-12 > table > tbody")
  table_body.innerHTML = ""

  for(let i = 0; i<appointments.length; i++){
    date_parse = Date.parse(appointments[i].date_stamp);
    if(date_parse >= start_date && date_parse <= end_date){
      console.log(date_parse)
      if(appointments[i].clinic == clinic_code){
        let table_r = document.createElement("tr");
        let table_h1 = document.createElement("th");
        let table_h2 = document.createElement("td");
        let table_h3 = document.createElement("td");
        let table_h4 = document.createElement("td");
        let table_h5 = document.createElement("td");
        let table_h6 = document.createElement("td");
        let table_h7 = document.createElement("td");
        let table_h8 = document.createElement("td");
        let table_h9 = document.createElement("td");
        let table_h10 = document.createElement("td");

        table_h1.innerHTML = i+1
        table_r.appendChild(table_h1);
      
        table_h2.innerHTML = await getUSerName(appointments[i].user_id)
        table_r.appendChild(table_h2)
      
        table_h3.innerHTML = appointments[i].date_stamp;
        table_r.appendChild(table_h3);
      
        table_h4.innerHTML = appointments[i].user_time;
        table_r.appendChild(table_h4);
      
        if(appointments[i].reason_code == "1"){
          table_h5.innerHTML = badge_examination
        }else{
          table_h5.innerHTML = badge_consultation;
        }
        table_r.appendChild(table_h5)
      
        table_h6.innerHTML = appointments[i].fees
        table_r.appendChild(table_h6);
      
        if(appointments[i].status_code == "1"){
          table_h7.innerHTML = badge_pending;
        }else if(appointments[i].status_code == "2"){
          table_h7.innerHTML = badge_confirmed
        }else if(appointments[i].status_code == "3"){
          table_h7.innerHTML = badge_complete
        }else{
          table_h7.innerHTML = badge_cancelled;
        }
        table_r.appendChild(table_h7);
      
        table_h8.innerHTML = btn_confirm +" "+ btn_cancel
        table_r.appendChild(table_h8);
      
        if(appointments[i].prescription != "none"){
          table_h9.innerHTML = btn_view_prescription;
        }else{
          table_h9.innerHTML = btn_upload_prescription;
        }
        table_r.appendChild(table_h9)

        table_h10.innerHTML = btn_view_history;
        table_r.appendChild(table_h10);
        table_body.appendChild(table_r)
      }
    }
  }
}

// appointments_to_table(getAppointments(getCookie("doc_id")))
getAppointments(getCookie("doc_id")).then((result) => {
  document.getElementById("clinic-0").setAttribute('class', 'nav-link active')
  document.getElementById("clinic-1").setAttribute('class', 'nav-link')
  appointments_to_table(result, "0")
})

$('#clinic-0').click(() =>{
  document.getElementById("clinic-0").setAttribute('class', 'nav-link active')
  document.getElementById("clinic-1").setAttribute('class', 'nav-link')
  getAppointments(getCookie("doc_id")).then((result) => {
    appointments_to_table(result, "0")
  })
})

$('#clinic-1').click(() =>{
  document.getElementById("clinic-0").setAttribute('class', 'nav-link ')
  document.getElementById("clinic-1").setAttribute('class', 'nav-link active')
  getAppointments(getCookie("doc_id")).then((result) => {
    appointments_to_table(result, "1")
  })
})

$('#date-filter-btn').click(() =>{
  let start_date = document.getElementById("start-date").value
  let end_date = document.getElementById("end-date").value

  getAppointments(getCookie("doc_id")).then((result) => {
    appointments_to_table_inrange(result, "0", start_date, end_date)
  })
  console.log(start_date, end_date)

})


