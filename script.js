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

        // Şimdilik MetalPriceAPI bunları vermiyor
        document.getElementById("quarter-price").textContent = "Yakında";
        document.getElementById("half-price").textContent = "Yakında";
        document.getElementById("full-price").textContent = "Yakında";

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
            "quarter-price",
            "half-price",
            "full-price",
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
