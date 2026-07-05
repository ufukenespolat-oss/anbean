const API_URL = "./data.json";

async function loadData() {

    try {

        const response = await fetch(API_URL + "?t=" + Date.now());

        const data = await response.json();

        document.getElementById("gold-price").textContent =
            Number(data.gram).toLocaleString("tr-TR") + " ₺";

        document.getElementById("quarter-price").textContent =
            Number(data.quarter).toLocaleString("tr-TR") + " ₺";

        document.getElementById("half-price").textContent =
            Number(data.half).toLocaleString("tr-TR") + " ₺";

        document.getElementById("full-price").textContent =
            Number(data.full).toLocaleString("tr-TR") + " ₺";

        document.getElementById("cumhuriyet-price").textContent =
            Number(data.cumhuriyet).toLocaleString("tr-TR") + " ₺";

        document.getElementById("usd-price").textContent =
            Number(data.usd).toLocaleString("tr-TR") + " ₺";

        document.getElementById("eur-price").textContent =
            Number(data.eur).toLocaleString("tr-TR") + " ₺";

    } catch(err){

        console.log(err);

    }

}
// HAVA DURUMU

async function loadWeather(){

    try{

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await response.json();

        document.getElementById("weather").textContent =
            weather.current.temperature_2m + "°C";

    }catch(err){

        console.log(err);

        document.getElementById("weather").textContent="--";

    }

}



// HABERLER

async function loadNews(){

    try{

        const response = await fetch("./news.json?t=" + Date.now());

        const news = await response.json();

        const container=document.getElementById("news-list");

        container.innerHTML="";

        news.slice(0,10).forEach((item,index)=>{

            container.innerHTML+=`

            <div class="news-item">

                ${item.image ? `<img src="${item.image}" class="news-image">` : ""}

                <h3>${item.title}</h3>

                <p>${item.summary}</p>

                <a class="news-button"
                href="haber.html?id=${index}">
                Haberi Oku →
                </a>

            </div>

            `;

        });

    }

    catch(err){

        console.log(err);

    }

}
// UYGULAMAYI BAŞLAT

loadData();
loadWeather();
loadNews();

// OTOMATİK GÜNCELLE

setInterval(loadData, 60000);      // 1 dakikada bir finans
setInterval(loadWeather, 600000);  // 10 dakikada bir hava
setInterval(loadNews, 600000);     // 10 dakikada bir haber
