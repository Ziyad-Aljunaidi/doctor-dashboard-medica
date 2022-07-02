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

async function read_history(doc_id){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/appointments_history?doc_id=${doc_id}`)
    let data = await response.json()
    if(data.length != 0){
        return data
    }
    else{
        return 0
    }
}


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
        table_h9.innerHTML = `<span class="badge badge-light">No Prescription</span`
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
      data_list_history.push(data_row)
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

async function history_appointments_to_table_inrange(
  appointments,
  clinic_code,
  start_date,
  end_date
) {
  start_date = Date.parse(start_date);
  end_date = Date.parse(end_date);
  let table_body = document.querySelector(
    "#top > div.doctor-dashboard > div.container.history-appointments > div.card.mb-12.table-class > table > tbody"
  );
  table_body.innerHTML = "";

  data_list_history.length = 0

  for (let i = 0; i < appointments.length; i++) {
    let data_row =[]
    date_parse = Date.parse(appointments[i].date_stamp);
    if (date_parse >= start_date && date_parse <= end_date) {
      console.log(date_parse);
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
        let table_h8 = document.createElement("td");
        let table_h9 = document.createElement("td");
        let table_h10 = document.createElement("td");

        table_h1.innerHTML = i + 1;
        table_r.appendChild(table_h1);

        let userName =  await getUSerName(appointments[i].user_id);
        data_row.push(userName)

        table_h2.innerHTML = userName
        table_r.appendChild(table_h2);
        data_row.push(userName)

        data = await getUserData(appointments[i].user_id);
        table_h11.innerHTML = data.phone_number;
        data_row.push(data.phone_number)

        table_r.appendChild(table_h11);
        table_h3.innerHTML = appointments[i].date_stamp;
        table_r.appendChild(table_h3);
        data_row.push(appointments[i].date_stamp)

        table_h4.innerHTML = checkTimeFormat(appointments[i].user_time);
        table_r.appendChild(table_h4);
        data_row.push(checkTimeFormat(appointments[i].user_time))

        if (appointments[i].reason_code == "1") {
          table_h5.innerHTML = badge_examination;
          data_row.push("Examination")
        } else {
          table_h5.innerHTML = badge_consultation;
          data_row.push("Consultation")
        }
        table_r.appendChild(table_h5);

        table_h6.innerHTML = appointments[i].fees;
        table_r.appendChild(table_h6);
        data_row.push(appointments[i].fees)

        if (appointments[i].status_code == "1") {
          table_h7.innerHTML = badge_pending;
          data_row.push("Pending")
        } else if (appointments[i].status_code == "2") {
          table_h7.innerHTML = badge_confirmed;
          data_row.push("Confirmed")
        } else if (appointments[i].status_code == "3") {
          table_h7.innerHTML = badge_complete;
          data_row.push("Completed")
        } else {
          table_h7.innerHTML = badge_cancelled;
          data_row.push("Cancelled")
        }
        table_r.appendChild(table_h7);

        //table_h8.innerHTML = btn_confirm + " " + btn_cancel;
        //table_r.appendChild(table_h8);

        if (appointments[i].prescription != "none") {
            table_h9.innerHTML = btnViewPrescription(appointments[i].prescription);
          } else {
            table_h9.innerHTML = `<span class="badge badge-light">No Prescription</span`
          }
        table_r.appendChild(table_h9);

        table_h10.innerHTML = btn_view_history;
        table_r.appendChild(table_h10);
        table_body.appendChild(table_r);
        data_list_history.push(data_row)
        console.log(data_list_history)
      }
    }
  }
}

read_history(getCookie("doc_id")).then((result) => {
    if(result != 0){
      history_appointments_to_table(result, "0");
    }else{
      document.getElementById('no-history-appointments').style.display = 'block'
      document.getElementById("history-appointment-table").style.display = 'none'
      document.getElementById('loading-screen').style.display = 'none'
    }
    
  });

  $("#history-date-filter-btn").click(() => {
    let start_date = document.getElementById("history-range-start").value;
    let end_date = document.getElementById("history-range-end").value;
  
    read_history(getCookie("doc_id")).then((result) => {
      history_appointments_to_table_inrange(result, "0", start_date, end_date);
    });
    console.log(start_date, end_date);
  });


var history_columns = ["Patient","Phone", "Date", "Time", "Reason", "Fee", "Status"];
var history_rows = data_list_history
let history_docData = getDoctorInfo(doc_id)

  $("#report-history").click(() => {
    var imgData =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCgRXhpZgAATU0AKgAAAAgABQEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAAEyAAIAAAAUAAAAWodpAAQAAAABAAAAbgAAAAAAAABIAAAAAQAAAEgAAAABMjAyMjowNjowNSAxMjo0MDoyNwAAA6ABAAMAAAABAAEAAKACAAMAAAABAQAAAKADAAMAAAABAGsAAAAAAAD/4QtEaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjUuMCI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wNi0wNVQxMjo0MDoyNyswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wNi0wNVQxMjo0MDoyNyswMjowMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InByb2R1Y2VkIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZmZpbml0eSBEZXNpZ25lciAxLjEwLjUiIHN0RXZ0OndoZW49IjIwMjItMDYtMDVUMTI6NDA6MjcrMDI6MDAiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/7QAsUGhvdG9zaG9wIDMuMAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICZElDQ19QUk9GSUxFAAEBAAACVGxjbXMEMAAAbW50clJHQiBYWVogB+YABgAFAAoAIAA2YWNzcE1TRlQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1sY21zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALZGVzYwAAAQgAAAA+Y3BydAAAAUgAAABMd3RwdAAAAZQAAAAUY2hhZAAAAagAAAAsclhZWgAAAdQAAAAUYlhZWgAAAegAAAAUZ1hZWgAAAfwAAAAUclRSQwAAAhAAAAAgZ1RSQwAAAhAAAAAgYlRSQwAAAhAAAAAgY2hybQAAAjAAAAAkbWx1YwAAAAAAAAABAAAADGVuVVMAAAAiAAAAHABzAFIARwBCACAASQBFAEMANgAxADkANgA2AC0AMgAuADEAAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMAAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHlYWVogAAAAAAAA9tYAAQAAAADTLXNmMzIAAAAAAAEMQgAABd7///MlAAAHkwAA/ZD///uh///9ogAAA9wAAMBu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";
  
    var doc = new jsPDF();
    doc.addImage(imgData, "JPEG", 15, 5, 23, 9.75);
    doc.setFontSize(12);
    doc.setFontType("bold")
    //doc.setFont("Times");
    doc.text(15, 20, `Dr.${doc_data.name}`);
  
    doc.setFontSize(10);
    doc.setFontType("normal")
    doc.text(15, 25, `${doc_data.category.charAt(0).toUpperCase() + doc_data.category.slice(1)}`)
    
    doc.setFontType("bold")
    doc.text(15, 30,"Clinc:" )
    doc.text(15, 35, "Address:")
  
    doc.setFontType("normal")
    doc.text(26,30, `${doc_data.clinics[0].clinic_name}`)
    doc.text(32,35, `${doc_data.clinics[0].address}`)
  
    
    doc.autoTable(history_columns, history_rows, {
      
      margin: { top: 40 },
      styles: { fillColor: [33, 37, 41], textColor:[255,255,255] },
      headStyles: {
        fillColor: [255, 204, 204],
        textColor: 0,
        fontSize:29
      },
      footStyles: {
        fillColor: [255, 204, 204],
        textColor: 0,
        fontSize:29
      },
      bodyStyles: {
        fillColor: [229,229,229],
        textColor: 0,
      },
      alternateRowStyles: {
        fillColor: [255,255,255],
      },
      theme: "plain",
  
    });
    doc.setPage(1)
    doc.save(`Resport ${doc_data.name} ${doc_data.clinics[0].clinic_name} ${Date.now()}.pdf`);
  });
  