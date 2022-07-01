console.log(doc_id+" APPPOINTMENTS HISTORY")
//async function getUserData(){
//
//}
//
//async function getAllHistory(doc_id){
//
//}

getDoctorInfo(doc_id).then((result) =>{
    doc_data = result
    document.getElementById("history-clinic-name").innerHTML = `<b>Clinic Name:</b> ${doc_data.clinics[0].clinic_name}`
    document.getElementById("history-clinic-addess").innerHTML = `<b>Clinic Address:</b> ${doc_data.address}`
    
  })


let data_list_history = []
async function history_appointments_to_table(appointments, clinic_code) {
  
  let table_body = document.querySelector(
    "#top > div.doctor-dashboard > div.container.history-appointments > div.card.mb-12.table-class > table > tbody"

  );
  table_body.innerHTML = "";

  for (let i = 0; i < appointments.length; i++) {
    let data_row =[]
    if (appointments[i].clinic == clinic_code) {
      let table_r = document.createElement("tr");
      let table_h1 = document.createElement("th");
      
      let table_h2 = document.createElement("td");
      let table_h11 = document.createElement("td")
      let table_h3 = document.createElement("td");
      let table_h4 = document.createElement("td");
      let table_h5 = document.createElement("td");
      let table_h6 = document.createElement("td");
      let table_h7 = document.createElement("td");
      let table_h9 = document.createElement("td");
      let table_h10 = document.createElement("td");

      table_h1.innerHTML = i + 1;
      let userName =  await getUSerName(appointments[i].user_id);
      data_row.push(userName)
      table_h2.innerHTML = userName;

      data = await getUserData(appointments[i].user_id);
      table_h11.innerHTML = data.phone_number;

      data_row.push(data.phone_number)
      
      table_h3.innerHTML = appointments[i].date_stamp;

      data_row.push(appointments[i].date_stamp)

      table_h4.innerHTML = checkTimeFormat(appointments[i].user_time);
      data_row.push(checkTimeFormat(appointments[i].user_time))

      // APPOINTMENT REASON EXAMINTATION-CONSULTATION
      if (appointments[i].reason_code == "1") {
        table_h5.innerHTML = badge_examination;
        data_row.push('Examination')
      } else {
        table_h5.innerHTML = badge_consultation;
        data_row.push('Consultation')
      }

      // APPOINTMENT FEES
      table_h6.innerHTML = appointments[i].fees;
      data_row.push(appointments[i].fees)

      // CHECK FOR STATUS
      if (appointments[i].status_code == "1") {
        table_h7.innerHTML = badge_pending;
        data_row.push('Pending')
      } else if (appointments[i].status_code == "2") {
        table_h7.innerHTML = badge_confirmed;
        data_row.push('Confirmed')
      } else if (appointments[i].status_code == "3") {
        table_h7.innerHTML = badge_complete;
        data_row.push('Completed')
      } else {
        table_h7.innerHTML = badge_cancelled;
        data_row.push('Cancelled')
      }

      // CONFIRM-CANCEL BUTTON
    

      // PRESCRIPTION
      if (appointments[i].prescription != "none") {
        table_h9.innerHTML = btnViewPrescription(appointments[i].prescription);
      } else {
        table_h9.innerHTML = btnUploadPrescription(appointments[i]);
      }




      table_h10.innerHTML = btn_view_history;
      table_r.appendChild(table_h1);
      table_r.appendChild(table_h2);
      table_r.appendChild(table_h11)
      table_r.appendChild(table_h3);
      table_r.appendChild(table_h4);
      table_r.appendChild(table_h5);
      table_r.appendChild(table_h6);
      table_r.appendChild(table_h7);
      //table_r.appendChild(table_h8);
      table_r.appendChild(table_h9);
      table_r.appendChild(table_h10);
      table_body.appendChild(table_r);
      data_list.push(data_row)
    }
    }
   
  document.querySelector("#loading-screen").style.display = "none";
  // $(".alter-btn").on("click",function(e) {
  //   //e.target.style.backgroundColor = "yellow"
  //   //e.target.innerHTML = "O"
  //   console.log(e.target.tagName)
  //   if(e.target.tagName == "I" || e.target.tagName == "i"){
  //     e.target.parentElement.setAttribute('class', "alter-btn badge badge-success")
  //     parent_td =  e.target.parentElement
  //     e.target.onclick = parent_td.parentElement.childNodes[2].style. pointerEvents= "none";
  //     e.target.onclick = parent_td.parentElement.childNodes[2].style.backgroundColor= "gray";
  //     window.location.reload()
  //     
  //   }else{
  //     e.target.setAttribute('class', "alter-btn badge badge-success")
  //     e.target.onclick = e.target.parentElement.childNodes[2].style. pointerEvents= "none";
  //     e.target.onclick = e.target.parentElement.childNodes[2].style.backgroundColor= "gray";
  //     window.location.reload()
  //   }
  // })
}


getAppointments(getCookie("doc_id")).then((result) => {
    if(result != 0){
      history_appointments_to_table(result, "0");
    }else{
      document.getElementById('no-appointments').style.display = 'block'
      document.getElementById("appointment-table").style.display = 'none'
      document.getElementById('loading-screen').style.display = 'none'
    }
    
  });