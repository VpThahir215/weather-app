let theme =document.querySelector(".Theame");
let circle=document.querySelector(".circle")
let searchBtn=document.querySelector("#button");
let heading=document.querySelector("#heading");
let searchInput=document.querySelector("#Search-input");





let dark=false;

circle.addEventListener("click",()=>{
    dark=!dark;
    if (dark) {
        circle.style.transform = "translateX(40px)";
    } else {
        circle.style.transform = "translateX(0)";
    }
});

searchBtn.addEventListener("click",()=>{
   let city=searchInput.value;
  heading.textContent =city
     
    
})
