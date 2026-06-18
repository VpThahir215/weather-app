// let theme =document.querySelector(".Theame");
// let circle=document.querySelector(".circle")
// let searchBtn=document.querySelector("#button");
// let heading=document.querySelector("#heading");
// let searchInput=document.querySelector("#Search-input");
// let temparature=document.querySelector("#Temparature")
// let condition=document.querySelector("#Condition")
// let favBtn=document.querySelector("#fav-btn")
// let favoritesList=document.querySelector(".location");




// let dark=false;
// let currentCity=""
// let favorites=[];

// circle.addEventListener("click",()=>{
//     dark=!dark;
//     if (dark) {
//         circle.style.transform = "translateX(40px)";
//     } else {
//         circle.style.transform = "translateX(0)";
//     }
// });

// searchBtn.addEventListener("click",()=>{
//    let city=searchInput.value;

//      getWeather(city)

// })

// async function getWeather(city) {
// let apiKey="baa12576a719e928407efcecb5e18ae8";
// let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// try{
// let response=await fetch(url);
//  if (!response.ok) {
//             throw new Error("Invalid city or API error");
//         }

// let data=await response.json();

//   heading.textContent =data.name;
// temparature.textContent=data.main.temp+" °C";
// condition.textContent=data.weather[0].main;
// currentCity=data.name
// }catch(error){
//    alert("Something went wrong. Please try again.")
// }





    
    
// }
// favBtn.addEventListener("click",()=>{
//     if (!currentCity) {
//         alert("Search a city first");
//         return;
//     }

//     if (!favorites.includes(currentCity)) {
//         favorites.push(currentCity);

//         localStorage.setItem("favorites", JSON.stringify(favorites));

//         alert("Added to favorites!");
//     }
   
    
// })
























let theme = document.querySelector(".Theame");
let circle = document.querySelector(".circle");
let searchBtn = document.querySelector("#button");
let heading = document.querySelector("#heading");
let searchInput = document.querySelector("#Search-input");
let temparature = document.querySelector("#Temparature");
let condition = document.querySelector("#Condition");
let favBtn = document.querySelector("#fav-btn");
let favoritesList = document.querySelector(".location");

let dark = false;
let currentCity = "";
let timer;

// load from localStorage safely
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// THEME TOGGLE
circle.addEventListener("click", () => {
    dark = !dark;
     if (dark) {
        circle.style.transform = "translateX(40px)";
        document.body.classList.add("dark");
    } else {
        circle.style.transform = "translateX(0)";
        document.body.classList.remove("dark");
    }
});


// 🔍 SEARCH BUTTON
searchBtn.addEventListener("click", () => {
    let city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
});


// 🌦️ GET WEATHER API
async function getWeather(city) {
    let apiKey = "baa12576a719e928407efcecb5e18ae8"; // ⚠️ replace this
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log(data); // debug

        // IMPORTANT FIX
        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        heading.textContent = data.name;
        temparature.textContent = data.main.temp + " °C";
        condition.textContent = data.weather[0].main;

        currentCity = data.name;

    } catch (error) {
        alert(error.message);
    }
}


// ❤️ ADD FAVORITE
favBtn.addEventListener("click", () => {

    if (!currentCity) {
        alert("Search a city first");
        return;
    }

    if (favorites.includes(currentCity)) {
        alert("Already added!");
        return;
    }

    favorites.push(currentCity);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();

});
// 🧾 RENDER FAVORITES
function renderFavorites() {

    favoritesList.innerHTML = "";

    favorites.forEach((city) => {

        let div = document.createElement("div");

        div.classList.add("favorite-city");

        div.innerHTML = `
            <span>${city}</span>
            <button class="remove-btn">X</button>
        `;

        // Click city → search weather
        div.querySelector("span").addEventListener("click", () => {
            searchInput.value = city;
            getWeather(city);
        });

        // Remove button
        div.querySelector(".remove-btn").addEventListener("click", () => {
            removeFavorite(city);
        });

        favoritesList.appendChild(div);

    });

}

// ❌ REMOVE FAVORITE
function removeFavorite(city) {

    favorites = favorites.filter(item => item !== city);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();

}


// 🔁 CLICK FAVORITE → SEARCH WEATHER
function searchWeather(city) {
    searchInput.value = city;
    getWeather(city);
}


// 🚀 INIT LOAD
renderFavorites();

function debounceSearch() {

    clearTimeout(timer);

    timer = setTimeout(() => {

        let city = searchInput.value.trim();

        if (city) {
            getWeather(city);
        }

    }, 2000);

}


searchInput.addEventListener("input", debounceSearch);