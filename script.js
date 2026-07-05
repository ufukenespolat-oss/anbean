const API_URL = "./data.json";

// =======================
// FİNANS VERİLERİ
// =======================

async function loadData() {

    try {

        const response = await fetch(API_URL + "?t=" + Date.now());

        if (!response.ok) {
            throw new Error("data.json okunamadı");
        }

        const data = await response.json();

        function setValue(id, value, suffix = " ₺") {

            const el = document.getElementById(id);

            if (el && value !== undefined) {

                el.textContent =
                    Number(value).toLocaleString("tr-TR") + suffix;

            }

        }

        setValue("gold-price", data.gram);
        setValue("quarter-price", data.quarter);
        setValue("half-price", data.half);
        setValue("full-price", data.full);
        setValue("cumhuriyet-price", data.cumhuriyet);
        setValue("usd-price", data.usd);
        setValue("eur-price", data.eur);

    } catch (err) {

        console.error("Finans Hatası:", err);

    }

}

// =======================
// HAVA DURUMU
// =======================

async function loadWeather() {

    try {

        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m"
        );

        const weather = await response.json();

        const el = document.getElementById("weather");

        if (el) {
            el.textContent = weather.current.temperature_2m + "°C";
        }

    } catch (err) {

        console.error("Hava Hatası:", err);

    }

}

// =======================
// HABERLER
// =================
