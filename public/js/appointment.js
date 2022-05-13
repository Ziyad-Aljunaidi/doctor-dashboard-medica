
const urlParams = new URLSearchParams(window.location.search);
const doc_name = urlParams.get("doc_name");
const doc_id = urlParams.get("doc_id");

//console.log(myParam)

async function getUserInfo() {
  let UserName = document.getElementById("name").value;
  let UserPhoneNumber = document.getElementById("phone").value;
  let UserDate = document.getElementById("date").value;
  let UserTime = document.getElementById("exampleFormControlSelect2").value;

  let response = await fetch(`/form?user_name=${UserName}&user_phone=${UserPhoneNumber}&user_date=${UserTime}&doc_id=${doc_id}`)
  let data = await response.json();
  return data
}


$("#myform").submit(function (e) {
  e.preventDefault();
   getUserInfo();
   window.location.href = '/confirmation';
  console.log("jaj")
});
