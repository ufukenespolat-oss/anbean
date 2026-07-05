const API_URL = "./data.json";

async function loadData() {
    try {

        const response = await fetch(API_URL + "?t=" + Date.now());
        const data = await response.json();

        // Döviz
        document.getElementById("usd-price").textContent =
            data.usd + " ₺";

        document.getElementById("eur-price").textContent =
            data.eur + " ₺";

        // Gram Altın
        document.getElementById("gold-price").textContent =
            data.gold + " ₺";

        // Şimdilik API'de yok
        const quarter = document.getElementById("quarter-price");
        const half = document.getElementById("half-price");
        const full = document.getElementById("full-price");

        if (quarter) quarter.textContent = "Yakında";
        if (half) half.textContent = "Yakında";
        if (full) full.textContent = "Yakında";

        // Hava Durumu
        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await weatherResponse.json();

        document.getElementById("weather").textContent =
            weather.current.temperature_2m + "°C";

    } catch (err) {
        console.error(err);

        [
            "gold-price",
            "usd-price",
            "eur-price",
            "weather"
        ].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "--";
        });
    }
}

loadData();
setInterval(loadData, 60000);
