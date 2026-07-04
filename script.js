console.log("ANBEAN hazır!");

document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click",()=>{
        alert(card.querySelector("h2").innerText);
    });
});
