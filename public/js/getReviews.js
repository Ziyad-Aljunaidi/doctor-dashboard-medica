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

let doc_id_rev = getCookie("doc_id");
//let myParams = new URLSearchParams(window.location.search);
console.log(doc_id_rev)

//let doc_id_rev = myParams.get("doc_id");
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

async function getReviewsData(doc_id) {
  try {
    let response = await fetch(
      `https://us-central1-medica72-5933c.cloudfunctions.net/api/getReviews?doc_id=${doc_id}`
    );
    let data = await response.json();
    return data.reviews;
  } catch (e) {
    return null;
  }
}

getReviewsData(doc_id_rev).then((result) => {
  console.log(result);
  document.getElementById("no-reviews").style.display = "none";
  ReviewsSection(result);
  
});

function toStarsRate(rate) {
  let div = document.createElement("div");
  let star_filled = '<i class="fa fa-star" aria-hidden="true"></i>';
  let star_o = '<i class="fa fa-star-o" aria-hidden="true"></i>';
  div.innerHTML += `${rate}/5`;
  for (let i = 0; i < 5; i++) {
    if (i < rate) {
      div.innerHTML += star_filled;
    } else {
      div.innerHTML += star_o;
    }
  }
  return div;
}

function toDate(date_stamp) {
  var timestamp = 1607110465663;
  var date = new Date(date_stamp);
  let final_date =
    date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
  let date_p = `<small class="text-muted">Date written: ${final_date}</small>`;
  return date_p;
}

//console.log(toDate(parseInt('1655933956932')))


async function ReviewsSection(data) {
  if (data != null) {
    let reviews_div = document.getElementById("reviews-list");

    let p_text = document.createElement("p");
    p_text.setAttribute("class", "card-text");

    for (let i = 0; i < data.length; i++) {
      let usr_img = document.createElement("img");
      usr_img.setAttribute("src", "images/user_avatar.png");
      usr_img.setAttribute("class", "card-img");
      usr_img.style.width = "100%";

      let div_card_1 = document.createElement("div");
      div_card_1.setAttribute("class", "card mb-12");
      div_card_1.style.margin = "30px";

      let div_row_2 = document.createElement("div");
      div_row_2.setAttribute("class", "row no-gutters");

      let div_img_3 = document.createElement("div");
      div_img_3.setAttribute("class", "col-md-1");
      div_img_3.style.margin = "30px";

      let div_name_4 = document.createElement("div");
      div_name_4.setAttribute("class", "col-md-4 float-left");
      let h5_name = document.createElement("h5");
      h5_name.setAttribute("class", "align-middle");

      let div_rev_5 = document.createElement("div");
      div_rev_5.setAttribute("class", "col-md-12");
      div_rev_5.style = "margin:20px ; margin-top:-30px!important;";

      let div_card_6 = document.createElement("div");
      div_card_6.setAttribute("class", "card-body");

      let p_text_rev = document.createElement("p");
      p_text_rev.setAttribute("class", "card-text");

      let p_text_date = document.createElement("p");
      p_text_date.setAttribute("class", "card-text");

      let name = data[i].user_name;
      let user_rating = data[i].user_rating;
      let user_review = data[i].user_review;
      let date = data[i].date_stamp;

      div_img_3.appendChild(usr_img);

      h5_name.innerHTML = name;
      div_name_4.appendChild(h5_name);
      p_text_rev.innerHTML = user_review;
      //p_text_date.innerHTML = date

      div_row_2.appendChild(div_img_3);
      div_row_2.appendChild(div_name_4);
      div_card_6.appendChild(toStarsRate(parseInt(user_rating)));

      div_card_6.appendChild(p_text_rev);
      p_text_date.innerHTML = toDate(parseInt(date));
      div_card_6.appendChild(p_text_date);

      div_rev_5.appendChild(div_card_6);

      div_row_2.appendChild(div_rev_5);

      div_card_1.appendChild(div_row_2);
      reviews_div.appendChild(div_card_1);
    }
    //document.getElementById("loading-screen").style.display = "none";
  } else {
    //document.getElementById("loading-screen").style.display = "none";
    document.getElementById("no-reviews").style.display = "block";
  }
}
