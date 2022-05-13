
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('speciality');
console.log(myParam)
async function goToSpeciality(speciality) {
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/newdoctor?speciality=${speciality}`)
    let data = await response.json();
    return data
}


async function getRating(query_data){

    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getRatings?doc_id=${query_data}`)
    
    let data = await response.json();
    //console.log(data.ratings)
    
    return data.ratings
}


function appendDataToDiv(data) {

    for(let i=0; i<=data.length; i++){
        let parent_div = document.createElement("div");
    parent_div.className = "res-card";

    let container = document.createElement("div");
    container.className = "container";

    let btn_div = document.createElement("div")
    let appointment_btn = document.createElement("a")
    //appointment_btn.href = `/appointment?doc_name=${data[i].name}&doc_id=${data[i].id}`
    appointment_btn.href = `/newappointment?doc_name=${data[i].name}&doc_id=${data[i].id}`
    appointment_btn.className = "btn btn-main-2 btn-icon btn-round-full"
    appointment_btn.innerHTML = "Make appointment <i class='icofont-simple-right ml-2'>"

    let doc_img = document.createElement("img");
    doc_img.src = "images/team/1.jpg";
    doc_img.alt = "doc_avatar";

    let ul_parent = document.createElement("ul");

    // Rating section
    let doc_info_rating = document.createElement("li");
    let rating_div = document.createElement("div");

    let doc_info_li1 = document.createElement("li");
    let doc_info_li2 = document.createElement("li");
    let doc_info_li3 = document.createElement("li");
    let doc_info_li4 = document.createElement("li");
    let doc_info_li5 = document.createElement("li");
    let doc_name_h5 = document.createElement("h5");
    let doc_info_p = document.createElement("p");

    //console.log("haha" + data[i].id)
    getRating(data[i].id).then((result) => {
        let rating = 0;
        //console.log(result.length)
        for (let i = 0; i< result.length; i++){
            rating += parseInt(result[i].user_rating)
        }
        rating = parseInt(rating/result.length)

        for(let i = 1; i<= rating; i++){
            let star_icon = "<i class='icofont-star' style='color: #ffb624;'></i>"
            rating_div.innerHTML+=star_icon
        }
        for(let i =rating; i<5; i++){
            let star_icon = "<i class='icofont-star'></i>"
            rating_div.innerHTML+=star_icon
        }
        rating_div.innerHTML+=`(${result.length})`
        doc_info_rating.appendChild(rating_div)
        console.log(rating_div)
        
    })

    doc_name_h5.innerHTML = "Dr. "+data[i].name
    ul_parent.appendChild(doc_name_h5)

    doc_info_li1.innerHTML = "<i class='icofont-doctor'>"+" Speciality: "+data[i].category
    ul_parent.appendChild(doc_info_p)

    doc_info_li2.innerHTML ="<i class='icofont-location-pin'></i>" + " Address: " + data[i].city+", "+ data[i].address
    ul_parent.appendChild(doc_info_p)



    doc_info_li4.innerHTML = "<i class='icofont-money'></i>" +" Fee: " +data[i].fee


    ul_parent.appendChild(doc_info_rating)
    ul_parent.appendChild(doc_info_li1)
    ul_parent.appendChild(doc_info_li2)
    ul_parent.appendChild(doc_info_li4)
    ul_parent.appendChild(doc_info_li5)


    parent_div.appendChild(container)
    container.appendChild(doc_img)
    container.appendChild(ul_parent)
    container.appendChild(appointment_btn)


    document.body.appendChild(parent_div)
    

    }

    
    
}


//appendDataToDiv("haha")
goToSpeciality(myParam).then((result) => {
    console.log(result)
    document.querySelector('#loading').style.visibility = "hidden"
    appendDataToDiv(result)
    

})