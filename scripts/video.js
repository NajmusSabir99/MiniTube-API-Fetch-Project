function loadCategories(){
    const url = "https://openapi.programming-hero.com/api/phero-tube/categories";
    fetch(url)
    .then(response => response.json())
    .then(data => displayCategories(data.categories))
    .catch(error=>{
        console.log(error.message);
    })
}
function displayCategories(data){
    const allBtn = document.getElementById("all-btn");
    data.forEach(element => {
        const categories = document.getElementById("categories");
        const button = document.createElement("button");
        button.innerText = element.category;
        categories.appendChild(button);
        const id = element.category_id;
        button.className = "btn mx-3";
            button.addEventListener("click",function(){
                    document.querySelectorAll("#categories button").forEach(btn=>{
                        btn.classList.remove("btn");
                    });
                    button.classList.add("btn","btn-error");
                 loadCards(id);
            });   
    }); 
     allBtn.className = "btn mx-3";
     allBtn.addEventListener("click", function(){
            document.querySelectorAll("#categories button").forEach(btn => {
                btn.classList.remove("btn");
            });
            allBtn.classList.add("btn","btn-error");
            loadCards(); 
            }); 
}
loadCategories();
function loadCards(id){
    let url;
    if(id){
       url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    }
    else{
       url = "https://openapi.programming-hero.com/api/phero-tube/videos";
    }
    fetch(url)
    .then(response => response.json())
    .then(data => {
         if (data.status === false) {
             displayFalseCard();
         }else{
             if(id){
                 displayCards(data.category);
            }else{
                 displayCards(data.videos);
            }
         }
    })
    .catch(error=>{
        console.log(error.message);
    });
}
const cardContainer = document.getElementById("card-container");
const errorDiv = document.createElement("div");
function displayFalseCard(){
    cardContainer.innerHTML = "";
    errorDiv.innerHTML = "";
        const errorIcon = document.createElement("img");
        errorIcon.src = "./assets/Icon.png";
        errorIcon.className = "w-64 h-64";
        const errorMsg = document.createElement("h2");
        errorMsg.innerText = "Opps!! Sorry there is no content here";
        errorMsg.className = "text-2xl mt-4 bold";
        errorDiv.className = "flex flex-col justify-center items-center w-full h-full";
        errorDiv.appendChild(errorIcon);
        errorDiv.appendChild(errorMsg);
        cardContainer.appendChild(errorDiv);
    }
 
  function displayCards(videos){
    cardContainer.innerHTML = "";
    videos.forEach(video=>{
      const author = video.authors[0];
      const verifiedBadge = author.verified
      ? '<img src="assets/check.png" class="w-4 h-4 inline ml-2"/>'
      : "";
      const cardBody = document.createElement("div");
            cardBody.className = "card-body flex-none";
            cardBody.innerHTML = 
            `<div class="card bg-base-100 w-72 h-72 shadow-sm">
                <img src="${video.thumbnail}" class="w-72 h-72 rounder-lg"/>
            </div>
            <div class="flex">
                <div>
                  <img src="${video.authors[0].profile_picture}" class="rounded-xl w-8 h-8 mt-4"/>
                </div>
        
                <div class="mt-3 pl-4">
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center gap-1">
                        <p class="inline">${author.profile_name}${verifiedBadge}</p>
                    </div>
                    <p>${video.others.views}</p>
                <div/>
            `;
      cardContainer.appendChild(cardBody);
    })
  }
loadCards();

