const API_KEY = "apikey YENI_API_KEY_BURAYA";

async function getData() {
  try {
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

    if (usd) {
      document.getElementById("usd-price").innerHTML = usd.buying + " ₺";
    }

    if (eur) {
      document.getElementById("eur-price").innerHTML = eur.buying + " ₺";
    }

    // Şimdilik örnek gram altın.
    // Bir sonraki adımda gerçek gram altın API'sini bağlayacağız.
    document.getElementById("gold-price").innerHTML = "Canlı API bağlanacak";

  } catch (e) {
    console.log(e);
  }
}

getData();
setInterval(getData, 60000);
