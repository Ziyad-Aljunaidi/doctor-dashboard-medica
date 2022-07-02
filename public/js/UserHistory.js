
$(window).on("load", function () {

        const queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      let newUserId = urlParams.get("user_id")
      console.log(newUserId);
      document.getElementById('username').innerHTML= `<b>Patient name: </b> ${urlParams.get("name")}`
      getAppointmentsData(newUserId).then((result) => {
        if (result != null) {
          console.log(result.appointments);
          putAppointments(result);
        } else {
          console.log("ITS NULL");
          document.getElementById("appointment-table").style.display="none"
          document.getElementById("no-appointments-user").style.display = "block"

        }
      });

  
    //document.getElementById("loading-screen").style.display = "none"
  });
function viewProfile(doc_id) {
    let url = `doctor_profile?doc_id=${doc_id}`;
    let view_profile = `<a href="https://www.medica72.com/${url}" target="_blank" class="badge badge-warning">View Profile</a>`;
    return view_profile;
  }


  function viewPrescription(url) {
    let view_prescription_btn = `<a href="${url}" target="_blank" class="badge badge-primary">View Prescription</a>`;
    return view_prescription_btn;
  }


  function getPrescription(prescription) {
    let no_prescription =
      '<span class="badge badge-pill badge-light">No presciption</span></a>';
    if (prescription == "none") {
      return no_prescription;
    } else {
      let prescription_btn = `<a href="${prescription}" target="_blank" class="badge badge-primary">View Prescription</a>`;
      return prescription_btn;
    }
  }

  function getReason(reason_code) {
    let examination_label =
      '<span class="badge badge-primary">Examination</span>';
    let consultation_label =
      '<span class="badge badge-secondary">Consultation</span>';
    if (parseInt(reason_code) == 1) {
      return examination_label;
    } else {
      return consultation_label;
    }
  }


async function getAppointmentsData(user_id) {
    try {
      let response = await fetch(
        `https://us-central1-medica72-5933c.cloudfunctions.net/api/getUserAppointments?user_id=${user_id}`
      );
      let data = await response.json();
      console.log(data);
      console.log("DATAT");
      return data;
    } catch (e) {
      return null;
    }
  }

  

  async function putAppointments(data) {
    
    let appointments = data.appointments;
    appointments = appointments.reverse();
    let appointments_table = document.getElementById("appointments-table");
  
    for (let i = 0; i < appointments.length; i++) {
        
    if(appointments[i].status_code == '3'){
      let tr_table = document.createElement("tr");
      let th = document.createElement("th");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      let td5 = document.createElement("td");
      let td6 = document.createElement("td");

      let th_num = i + 1;
      th.innerHTML = th_num;
  
      let doc_name = appointments[i].name;
      let doc_speciality = appointments[i].speciality;
      let date = appointments[i].date_stamp;
 
  
      let reason = appointments[i].reason_code;

      let prescription = appointments[i].prescription;
      let doctor_id = appointments[i].doc_id;
  
      td1.innerHTML = doc_name;
      td2.innerHTML =
        doc_speciality.charAt(0).toUpperCase() + doc_speciality.slice(1);
      td3.innerHTML = date;
      td4.innerHTML = getReason(reason);
      td5.innerHTML = getPrescription(prescription);
      td6.innerHTML = viewProfile(doctor_id);

  
      tr_table.appendChild(th);
      tr_table.appendChild(td1);
      tr_table.appendChild(td2);
      tr_table.appendChild(td3);
      tr_table.appendChild(td4);
      tr_table.appendChild(td5);
      tr_table.appendChild(td6);

      appointments_table.appendChild(tr_table);
      console.log("done" + i);
  
     //$("#cancel-btn").click( function(){
     //  console.log("cancel-btn")
     //  //updateAppointmentStatus(appointments[i].doc_id,appointments[i].user_id,appointments[i].visit_id,appointments[i].user_time,"5",appointments[i].date_stamp,appointments[i].reason_code,appointments[i].fees,appointments[i].prescription,appointments[i].clinic_code)
     //})
      }
    }
    
  }
  