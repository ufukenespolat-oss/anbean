const API_URL = "./data.json";

async function loadData() {
    try {

        const response = await fetch(API_URL + "?t=" + Date.now());
        const data = await response.json();

        // Döviz
        document.getElementById("usd-price").textContent =
            Number(data.usd).toLocaleString("tr-TR") + " ₺";

        document.getElementById("eur-price").textContent =
            Number(data.eur).toLocaleString("tr-TR") + " ₺";

        // Altın
        document.getElementById("gold-price").textContent =
            Number(data.gram).toLocaleString("tr-TR") + " ₺";

        const quarter = document.getElementById("quarter-price");
        if (quarter)
            quarter.textContent =
                Number(data.quarter).toLocaleString("tr-TR") + " ₺";

        const half = document.getElementById("half-price");
        if (half)
            half.textContent =
                Number(data.half).toLocaleString("tr-TR") + " ₺";

        const full = document.getElementById("full-price");
        if (full)
            full.textContent =
                Number(data.full).toLocaleString("tr-TR") + " ₺";

        const cumhuriyet = document.getElementById("cumhuriyet-price");
        if (cumhuriyet)
            cumhuriyet.textContent =
                Number(data.cumhuriyet).toLocaleString("tr-TR") + " ₺";

    } catch (err) {
        console.error("Altın/Döviz Hatası:", err);

        [
            "gold-price",
            "quarter-price",
            "half-price",
            "full-price",
            "cumhuriyet-price",
            "usd-price",
            "eur-price"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "--";
        });
    }

    // Hava Durumu
    try {
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await weatherResponse.json();

        document.getElementById("weather").textContent =
            weather.current.temperature_2m + "°C";

    } catch (err) {
        console.error("Hava Durumu Hatası:", err);

        const weather = document.getElementById("weather");
        if (weather) weather.textContent = "--";
    }
}

// Haberler
async function loadNews() {
    try {
        const response = await fetch("./news.json?t=" + Date.now());
        const news = await response.json();

        const container = document.getElementById("news-list");
        if (!container) return;

        container.innerHTML = "";

        news.slice(0, 10).forEach(item => {
            container.innerHTML += `
                <div class="news-item">
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.link}" target="_blank">Haberi Oku →</a>
                </div>
            `;
        });

    } catch (err) {
        console.error("Haber Hatası:", err);
    }
}

loadData();
loadNews();

setInterval(loadData, 60000);
setInterval(loadNews, 600000);
