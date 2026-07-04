const API_KEY = "apikey 5eu5WYbeEA9CCOQiR48HuX:5eqmsfI8BegutOmyRuG14j";

async function getData() {
  try {

    // Dolar - Euro
    const response = await fetch("https://api.collectapi.com/economy/allCurrency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "authorization": API_KEY
      }
    });

    const data = await response.json();

    const usd = data.result.find(x => x.code === "USD");
    const eur = data.result.find(x => x.code === "EUR");

    if (usd)
      document.getElementById("usd-price").innerHTML =
        Number(usd.buying).toFixed(2) + " ₺";

    if (eur)
      document.getElementById("eur-price").innerHTML =
        Number(eur.buying).toFixed(2) + " ₺";

    // Gram Altın
    const gold = await fetch("https://api.allorigins.win/raw?url=https://finans.truncgil.com/today.json");
    const goldData = await gold.json();

    document.getElementById("gold-price").innerHTML =
      goldData["Gram Altın"].Alış + " ₺";

    document.getElementById("weather").innerHTML = "31°C ☀️";

  } catch (e) {
    console.log(e);

    document.getElementById("gold-price").innerHTML = "--";
    document.getElementById("usd-price").innerHTML = "--";
    document.getElementById("eur-price").innerHTML = "--";
    document.getElementById("weather").innerHTML = "--";
  }
}

getData();
setInterval(getData,60000);
