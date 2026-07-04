async function getUSD() {
    try {
        const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=TRY");
        const data = await res.json();
        document.getElementById("usd-price").textContent =
            data.rates.TRY.toFixed(2) + " ₺";
    } catch {
        document.getElementById("usd-price").textContent = "--";
    }
}

async function getEUR() {
    try {
        const res = await fetch("https://api.frankfurter.app/latest?from=EUR&to=TRY");
        const data = await res.json();
        document.getElementById("eur-price").textContent =
            data.rates.TRY.toFixed(2) + " ₺";
    } catch {
        document.getElementById("eur-price").textContent = "--";
    }
}

async function getGold() {
    try {
        const res = await fetch("https://finans.truncgil.com/today.json");
        const data = await res.json();

        document.getElementById("gold-price").textContent =
            data["Gram Altın"] || "--";

    } catch {
        document.getElementById("gold-price").textContent = "--";
    }

    document.getElementById("quarter-price").textContent = "Yakında";
    document.getElementById("half-price").textContent = "Yakında";
    document.getElementById("full-price").textContent = "Yakında";
}

async function getWeather() {
    try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=38.42&longitude=27.14&current=temperature_2m");
        const data = await res.json();

        document.getElementById("weather").textContent =
            data.current.temperature_2m + "°C";

    } catch {
        document.getElementById("weather").textContent = "--";
    }
}

function loadAll() {
    getUSD();
    getEUR();
    getGold();
    getWeather();
}

loadAll();

setInterval(loadAll,60000);
